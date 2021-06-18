export interface TLoginData {
  name: string
  password: string
  email?: string
}
export interface TLoginForm {
  name: string
  password: string
  email: string  
  error?: { message: string }
  submit: any
}
export interface TLoginItem {
  form: TLoginForm | null
  data: TLoginData
}
export interface TSiteForm {
  name: string
  passLength: string
  error?: { message: string }
  submit: any
}
export interface TSiteData {
  name: string
  passLength?: number
  logins: TLoginList
}
export interface TSiteItem {
  data: TSiteData
  form?: TSiteForm
}
export type TLoginList = {
  [id: string]: TLoginItem
} & {
  form?: TLoginForm
}
export type TSiteList = {
  [id: string]: TSiteItem
} & {
  form: TSiteForm
  id: number
}
interface TSite {
  siteId: string
}
interface TLogin {
  loginId: string
}
interface TField {
  field: string
  payload: string
}
export interface TSiteAction {
  type:
    'SITE_DELETE'         |
    'SITE_UPDATE_TOGGLE'  |
    'SITE_UPDATE_SUBMIT'  |
    'LOGIN_CREATE_TOGGLE'
}
export interface TLoginAction {
  type: 
    'LOGIN_DELETE'        |
    'LOGIN_UPDATE_TOGGLE' |
    'LOGIN_UPDATE_SUBMIT'
}

export interface TLoginUpdateChange {
  type: 'LOGIN_UPDATE_CHANGE'
}
export interface TLoginCreateChange {
  type: 'LOGIN_CREATE_CHANGE'
}
export interface TSiteUpdateChange {
  type: 'SITE_UPDATE_CHANGE'
}
export interface TSiteCreateChange {
  type: 'SITE_CREATE_CHANGE'
}
export interface TLoginCreateSubmit {
  type: 'LOGIN_CREATE_SUBMIT',
}
export interface TSiteCreateSubmit {
  type: 'SITE_CREATE_SUBMIT',
}
export type TAction =
  TSiteAction & TSite |
  TSiteCreateSubmit |
  TSiteCreateChange & TField |
  TSiteUpdateChange & TSite & TField |
  TLoginAction & TSite& TLogin |
  TLoginCreateSubmit & TSite |
  TLoginCreateChange & TSite & TField |
  TLoginUpdateChange & TSite & TLogin & TField
