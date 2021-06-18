import { PassKeeper } from './pass-keeper'
import { producer } from './producer'
import { TSiteItem, TSiteList } from './types'

let dataFolder: FileSystemDirectoryHandle
while (true) {
  await buttonClick()
  dataFolder = await showDirectoryPicker().catch(() => null)
  if (!dataFolder) continue
  const mode = 'readwrite'
  if (await dataFolder.queryPermission({ mode }) == 'granted') break
  if (await dataFolder.requestPermission({ mode }) == 'granted') break
}
async function buttonClick() {
  let button = document.querySelector('button')
  button.disabled = false
  await new Promise(r => button.onclick = r)
  button.disabled = true
}
async function visibilityState(state: VisibilityState) {
  if (document.visibilityState == state) return
  await new Promise(res => document.onvisibilitychange = () => {
    if (document.visibilityState == state) res(null)
  })
}
async function writeText(handle: FileSystemFileHandle, text: string) {
  let writable = await handle.createWritable()
  await writable.write(text)
  await writable.close()
}
async function readEntries(handle: FileSystemDirectoryHandle) {
  let ret: FileSystemHandle[] = []
  for await (let entry of handle.values()) ret.push(entry)
  return ret
}
let lockFolder = await dataFolder.getDirectoryHandle('lock', { create: true })
let lockName: string
try { while (true) {
  lockName = Array
    .from(crypto.getRandomValues(new Uint8Array(16)))
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')  
  outer: 
  while (true) {
    await lockFolder.getFileHandle(lockName, { create: true })
    let attempts = 0
    while (true) {
      let locks = await readEntries(lockFolder)
      if (locks.length == 1 && locks[0].name == lockName) break outer
      if (++attempts >= 3) break
      await new Promise(r => setTimeout(r, 300))   
    }
    await lockFolder.removeEntry(lockName)
    document.body.innerHTML = `
    <div id="load-wrapper">
      <div>
        The folder is already in use by another active instance of this app<br>
        <button>Retry</button>
      </div>
    </div>`
    await buttonClick()
  }
  document.body.innerHTML = ''
  async function getHandles(suffix: string) {
    let dataName = 'data-' + suffix + '.json'
    let updateName = 'updates-' + suffix
    let dataFile = await dataFolder
      .getFileHandle(dataName)
      .catch(() => null) as FileSystemFileHandle
    if (dataFile && (await dataFile.getFile()).size == 0) {
      dataFile = null
    }
    let updateDir = await dataFolder
      .getDirectoryHandle(updateName)
      .catch(() => null) as FileSystemDirectoryHandle
    return { dataName, updateName, dataFile, updateDir }
  }
  let state: TSiteList
  let pri = await getHandles('odd')
  let sec = await getHandles('even')
  if (!pri.dataFile && !sec.dataFile) {
    state = { 
      "id": 1000,
      "form": {
        "name": "",
        "passLength": "",
        "error": null,
        "submit": {},
      }
    } as TSiteList
    let dataFile = await dataFolder
      .getFileHandle(pri.dataName, { create: true })
    await writeText(dataFile, JSON.stringify(state))
    pri.updateDir = await dataFolder
      .getDirectoryHandle(pri.updateName, { create: true })
  } else {
    if (!pri.dataFile || sec.dataFile && pri.updateDir) {
      [pri, sec] = [sec, pri]
    }
    if (pri.dataFile && sec.updateDir) {
      if (sec.dataFile) await dataFolder.removeEntry(sec.dataName)
      await dataFolder.removeEntry(sec.updateName, { recursive: true })
      sec.dataFile = null
      sec.updateDir = null
    }
    state = await pri.dataFile.getFile()
      .then(file => file.text())
      .then(text => JSON.parse(text))
    pri.updateDir = pri.updateDir ?? await dataFolder
      .getDirectoryHandle(pri.updateName, { create: true })
    let updateFiles = await readEntries(pri.updateDir)
    updateFiles = updateFiles.filter(h => !isNaN(Number(h.name)))
    if (updateFiles.length) {
      updateFiles.sort((a, b) => Number(a.name) - Number(b.name))
      for (let file of updateFiles) {
        if (file.kind != 'file') continue
        let lines = await file.getFile()
          .then(file => file.text())
          .then(text => text.split('\n'))
        for (let line of lines) {
          if (!line) continue
          state = producer(state, JSON.parse(line))
        }
      }
      sec.dataFile = await dataFolder
        .getFileHandle(sec.dataName, { create: true })
      await writeText(sec.dataFile, JSON.stringify(state))
      await dataFolder.removeEntry(pri.dataName)
      await dataFolder.removeEntry(pri.updateName, { recursive: true })
      sec.updateDir = await dataFolder
        .getDirectoryHandle(sec.updateName, { create: true })
      ;[pri, sec] = [sec, pri]
    }
  }
  
  function sortedByName(items: { [id: string]: any }) {
    return Object.entries(items)
      .filter(a => a[0] != 'id' && a[0] != 'form')
      .sort((a, b) => a[1].data.name.localeCompare(b[1].data.name))
  }
  let pk = document.createElement('pass-keeper') as PassKeeper
  pk.state = {
    ...Object.fromEntries(
      sortedByName(state).map(([id, site]: [string, TSiteItem]) => [id, {
        ...site,
        data: {
          ...site.data,
          logins: {
            ...Object.fromEntries(sortedByName(site.data.logins)),
            form: site.data.logins.form
          }
        }
      }])
    ),
    id: state.id,
    form: state.form
  } as TSiteList  
  document.body.append(pk)
  let counter = 0
  let actions = []
  async function writeActions() {
    if (!actions.length) return
    let text = actions.map(a => JSON.stringify(a)).join('\n')
    actions = []
    let file = await pri.updateDir
      .getFileHandle(String(counter), { create: true })
    await writeText(file, text)
    counter++    
  }
  let timeout = false
  async function handleDispatch(e: CustomEvent) {
    pk.state = producer(pk.state, e.detail)
    actions.push(e.detail)
    if (timeout) return
    timeout = true
    await new Promise(r => setTimeout(r, 3000))
    timeout = false   
    await writeActions()
  }
  window.addEventListener('dispatch', handleDispatch)
  await visibilityState('hidden')
  window.removeEventListener('dispatch', handleDispatch)
  pk.remove()
  await writeActions()
  await lockFolder.removeEntry(lockName)
  await visibilityState('visible')
}} catch (e) {
  document.body.innerHTML = `
  <div id="load-wrapper">
    <div>${e?.message}</div>
  </div>`
  await lockFolder.removeEntry(lockName)
}