import './login-card'
import './login-form'
import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import * as styles from './styles'
import { TLoginItem } from './types'

@customElement('login-item')
class LoginItem extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.buttonOverlay}
  `
  @property({ attribute: false })
  item: TLoginItem
  siteId: string
  loginId: string
  handleClick = e => {
    let button = e.target.closest('[data-op]')
    if (!(button instanceof HTMLButtonElement)) return
    e.preventDefault()
    e.stopPropagation()
    let type = button.dataset.op
    let { siteId, loginId } = this
    this.dispatchEvent(new CustomEvent('dispatch', {
      bubbles: true, composed: true,
      detail: { type, siteId, loginId }
    }))
  }
  renderForm() {
    return html`
      <div id="buttons">
        <button data-op="LOGIN_DELETE">Delete</button>
        <button data-op="LOGIN_UPDATE_TOGGLE">Cancel</button>
      </div>
      <login-form
        .submitType=${'LOGIN_UPDATE_SUBMIT'}
        .inputType=${'LOGIN_UPDATE_CHANGE'}
        .siteId=${this.siteId}
        .loginId=${this.loginId}
        .form=${this.item.form}
      ></login-form>
    `
  }
  renderCard() {
    return html`
      <div id="buttons">
        <button data-op="LOGIN_UPDATE_TOGGLE">Edit</button>
      </div>
      <login-card .data=${this.item.data}></login-card>
    `
  }
  render() {
    return html`
      <div id="wrapper" @click=${this.handleClick}>
        ${this.item.form ? this.renderForm() : this.renderCard()}
      </div>
    `
  }
}
