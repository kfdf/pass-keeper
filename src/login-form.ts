import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import * as styles from './styles'
import { TLoginForm } from './types'

@customElement('login-form')
class LoginForm extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.card}
    ${styles.form}
  `
  @property({ attribute: false })
  form: TLoginForm
  submitType: string
  inputType: string
  siteId: string
  loginId?: string
  handleInput = (e: InputEvent) => {
    let input = e.target
    if (!(input instanceof HTMLInputElement)) return
    e.preventDefault()
    e.stopPropagation()
    let { id: field, value: payload } = input
    let { siteId, loginId, inputType: type } = this
    this.dispatchEvent(new CustomEvent('dispatch', {
      bubbles: true, composed: true,
      detail: { type, field, siteId, loginId, payload },
    }))
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    let { siteId, loginId, submitType: type } = this
    this.dispatchEvent(new CustomEvent('dispatch', { 
      bubbles: true, composed: true,
      detail: { type, siteId, loginId },
    }))
  }

  @query('#error')
  errorDiv: HTMLDivElement  
  showId: number
  async willUpdate(props: Map<string, any>) {
    if (!this.hasUpdated) return
    let prevForm = props.get('form') as TLoginForm
    if (!prevForm || prevForm.error === this.form.error) return
    let { classList } = this.errorDiv
    if (!this.form.error) return classList.remove('show')
    classList.add('show')
    clearTimeout(this.showId)
    this.showId = setTimeout(() => classList.remove('show'), 1200)
  }
  updated(props: Map<string, any>) {
    let prevForm = props.get('form') as TLoginForm
    if (!prevForm || prevForm.submit === this.form.submit) return
    this.nameInput.focus()
  }
  @query('#name')
  nameInput: HTMLInputElement    
  @query('#password')
  passwordInput: HTMLInputElement
  @query('#email')
  emailInput: HTMLInputElement    
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      if (e.target == this.nameInput) {
        e.preventDefault()
        this.passwordInput.focus()
      } else if (e.target == this.passwordInput) {
        e.preventDefault()
        this.emailInput.focus()
      }
    }
  }
  render() {
    let { name, password, email, error } = this.form
    return html`
      <div id="card" class=${classMap({ error: !!error })}>
        <div id="error">${error?.message}</div>
        <form @submit=${this.handleSubmit} 
          @input=${this.handleInput} 
          @keydown=${this.handleKeyDown}>
          <fieldset>
            <label for="name">Name</label>
            <input id="name" .value=${name} autocomplete="off">
          </fieldset>
          <fieldset>
            <label for="password">Password</label>
            <input id="password" .value=${password}>
          </fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input id="email" .value=${email}>
          </fieldset>
          <input type="submit" hidden>
        </form>
      </div>
    `
  }
}