import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import * as styles from './styles'
import { classMap } from 'lit/directives/class-map.js'
import { TSiteForm } from './types'

@customElement('site-form')
class SiteForm extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.card}
    ${styles.form}
  `
  @property({ attribute: false })
  form: TSiteForm
  submitType: string
  inputType: string
  siteId: string

  @query('#name')
  nameInput
  @query('#passLength')
  passLengthInput
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      if (e.target == this.nameInput) {
        e.preventDefault()
        this.passLengthInput.focus()
      }
    }
  }
  handleInput = e => {
    let input = e.target
    if (!(input instanceof HTMLInputElement)) return
    e.preventDefault()
    e.stopPropagation()
    let { siteId, inputType: type } = this
    let { id: field, value: payload } = input
    this.dispatchEvent(new CustomEvent('dispatch', {
      bubbles: true, composed: true,
      detail: { type, field, siteId, payload }
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    let { siteId, submitType: type } = this
    this.dispatchEvent(new CustomEvent('dispatch', {
      bubbles: true, composed: true,
      detail: { type, siteId }
    }))
  }
  updated(props: Map<string, any>) {
    let prevForm = props.get('form') as TSiteForm
    if (!prevForm || prevForm.submit === this.form.submit) return
    this.nameInput.focus()
  }  
  @query('#error')
  errorDiv: HTMLDivElement
  showId: number
  async willUpdate(props: Map<string, any>) {
    if (!this.hasUpdated) return
    let prevForm = props.get('form') as TSiteForm
    if (!prevForm || prevForm.error == this.form.error) return
    let { classList } = this.errorDiv
    if (!this.form.error) return classList.remove('show')
    classList.add('show')
    clearTimeout(this.showId)
    this.showId = setTimeout(() => classList.remove('show'), 1200)
  }
  render() {
    let { name, passLength, error } = this.form
    return html`
      <div id="card" class=${classMap({ error: !!error})}>
        <div id="error">${error?.message}</div>
        <form @submit=${this.handleSubmit}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}>
          <fieldset>
            <label for="name">Site</label>
            <input id="name" .value=${name} autocomplete="off">
          </fieldset>
          <fieldset>
            <label for="passLength">Password size limit</label>
            <input id="passLength" .value=${passLength}>
          </fieldset>
          <input type="submit" hidden>
        </form>
      </div>
    `
  }
}