import './site-card'
import './site-form'
import './site-details'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import * as styles from './styles'
import { TSiteItem } from './types'

@customElement('site-item')
class SiteItem extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.buttonOverlay}
  `
  @property({ attribute: false })
  item: TSiteItem
  @property({ type: Boolean, attribute: 'data-expanded', reflect: true })
  expanded
  siteId: string
  expandable: boolean
  willUpdate() {
    this.expanded = this.expandable && this.item.data.logins.form
  }
  renderDetails() {
    return html`
      <site-details
        .item=${this.item}
        .siteId=${this.siteId}
      ></site-details>
    `
  }
  handleClick = e => {
    let button = e.target?.closest('[data-op]')
    if (!(button instanceof HTMLButtonElement)) return
    e.preventDefault()
    e.stopPropagation()    
    let type = button.dataset.op
    let { siteId } = this
    this.dispatchEvent(new CustomEvent('dispatch', {
      bubbles: true, composed: true,
      detail: { type, siteId }
    }))
  }
  renderForm() {
    return html`
      <div id="buttons">
        <button data-op="SITE_DELETE">Delete</button>
        <button data-op="SITE_UPDATE_TOGGLE">Cancel</button>
      </div>
      <site-form
        .submitType=${'SITE_UPDATE_SUBMIT'}
        .inputType=${'SITE_UPDATE_CHANGE'}
        .form=${this.item.form}
        .siteId=${this.siteId}
      ></site-form>
    `
  }
  renderCard() {
    return html`
      <div id="buttons">
        <button data-op="SITE_UPDATE_TOGGLE">Edit</button>
      </div>
      <site-card
        .data=${this.item.data}
        .siteId=${this.siteId}
      ></site-card>
    `
  }
  render() {
    return html`
      <div id="wrapper"  @click=${this.handleClick}>
        ${this.expanded ? this.renderDetails() :
          this.item.form ? this.renderForm() : this.renderCard()
        }
      </div>
    `
  }
}