import { produce } from 'immer'
import { TAction, TLoginForm, TLoginList, TSiteForm, TSiteList } from './types'

function validateLoginForm(
  form: TLoginForm, 
  logins: TLoginList, 
  passLength: number = null, 
  loginId: string = null
) {
  let name = form.name.trim()
  let password = form.password.trim()
  let email = form.email.trim()
  if (!name) return { 
    error: 'Login name is empty' 
  }
  for (let id in logins) {
    if (id !== 'form' && id !== loginId && 
      logins[id].data.name === name) return { 
      error: 'Login name already exists' 
    }
  }  
  if (passLength != null && password.length > passLength) return { 
    error: 'Password is too long' 
  }
  return {
    name, password, email: email ?? null
  }
}
type NewType = TLoginList

function validateSiteForm(
  form: TSiteForm, 
  sites: TSiteList, 
  logins: NewType = null, 
  siteId: string = null
) {
  let name = form.name.trim();
  let passLengthStr = form.passLength.trim();
  if (!name) return { 
    error: 'Site name is empty' 
  }
  for (let id in sites) {
    if (id !== 'form' && id !== 'id' && id !== siteId && 
      sites[id].data.name === name) return { 
      error: 'Site already exists' 
    }
  }
  if (!passLengthStr) return { 
    name, passLength: null 
  }
  if (!/^\d{1,9}$/.test(passLengthStr)) return { 
    error: 'Invalid password size' 
  }
  let passLength = Number(passLengthStr)
  for (let id in logins) {
    if (id !== 'form'&&  
      logins[id].data.password.length > passLength) return { 
      error: 'Password size is too small' 
    }
  }    
  return { name, passLength }
}

export const producer = produce((sites: TSiteList, action: TAction) => {
  switch (action.type) {
    case 'SITE_CREATE_CHANGE': {
      let { field, payload } = action
      sites.form[field] = payload
      break
    }
    case 'SITE_UPDATE_CHANGE': {
      let { siteId, field, payload } = action
      sites[siteId].form[field] = payload
      break
    }
    case 'LOGIN_CREATE_CHANGE': {
      let { siteId, field, payload } = action
      sites[siteId].data.logins.form[field] = payload
      break
    }
    case 'LOGIN_UPDATE_CHANGE': {
      let { siteId, loginId, field, payload } = action
      sites[siteId].data.logins[loginId].form[field] = payload
      break
    }

    case 'SITE_DELETE': {
      let { siteId } = action
      let hasLogins = Object
        .keys(sites[siteId].data.logins)
        .some(key => key !== 'form')
      if (hasLogins) {
        sites[siteId].form.error = { 
          message: 'Site has logins'
        }
      } else {
        delete sites[siteId]
      }
      break
    }
    case 'SITE_CREATE_SUBMIT': {
      let { name, passLength, error } = validateSiteForm(
        sites.form, sites)
      if (error) {
        sites.form.error = { message: error }
      } else {
        sites['_' + sites.id++] = {
          data: {
            name, passLength,
            logins: { form: null }
          },
          form: null
        }
        sites.form = {
          name: '',
          passLength: '',
          error: null,
          submit: {}
        }
      }
      break
    }
    case 'SITE_UPDATE_SUBMIT': {
      let { siteId } = action
      let site = sites[siteId]
      let { name, passLength, error } = validateSiteForm(
        site.form, sites, site.data.logins, siteId)
      if (error) {
        site.form.error = { message: error }
      } else {
        site.form = null
        site.data.name = name
        site.data.passLength = passLength
      }
      break
    }
    case 'SITE_UPDATE_TOGGLE': {
      let { siteId } = action
      let site = sites[siteId]
      site.form = site.form ? null : {
        name: site.data.name,
        passLength: String(site.data.passLength ?? ''),
        error: null,
        submit: {}
      }
      break
    }
    case 'LOGIN_UPDATE_TOGGLE': {
      let { loginId, siteId } = action
      let site = sites[siteId]
      let login = site.data.logins[loginId]
      login.form = login.form  ? null : {
        name: login.data.name, 
        password: login.data.password, 
        email: login.data.email ?? '', 
        error: null,
        submit: {}
      }
      break
    }
    case 'LOGIN_UPDATE_SUBMIT': {
      let { siteId, loginId } = action
      let { data } = sites[siteId]
      let login = data.logins[loginId]
      let { error, name, password, email } = validateLoginForm(
        login.form, data.logins, data.passLength, loginId)
      if (error) {
        login.form.error = { message: error }
      } else {
        login.data.name = name
        login.data.password = password
        login.data.email = email
        login.form = null
      }
      break
    }
    case 'LOGIN_CREATE_SUBMIT': {
      let { siteId } = action
      let site = sites[siteId];
      let { logins } = site.data;
      let { name, password, email, error } = validateLoginForm(
        logins.form, logins, site.data.passLength);
      if (error) {
        logins.form.error = { message: error }
      } else {
        logins['_' + sites.id++] = {
          data: { name, password, email }, 
          form: null
        }
        logins.form = {
          name: '',
          password: '',
          email: '',
          error: null,
          submit: {}
        }        
      }
      break
    }
    case 'LOGIN_CREATE_TOGGLE': {
      let { siteId } = action
      let { logins } = sites[siteId].data
      if (logins.form) {
        for (let loginId in logins) {
          if (loginId == 'form') continue
          logins[loginId].form = null
        }
        logins.form = null
      } else {
        logins.form = {
          name: '',
          password: '',
          email: '',
          error: null,
          submit: {}
        }
      }
      break
    }
    case 'LOGIN_DELETE': {
      let { siteId, loginId } = action
      delete sites[siteId].data.logins[loginId]
      break
    }
  }
})