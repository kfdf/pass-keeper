import './login-form'
import './login-item'
import './site-item'
import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import * as styles from './styles'
import { TSiteItem } from './types'
import { repeat } from 'lit/directives/repeat.js'

@customElement('site-details')
class SiteDetails extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.buttonOverlay}
    :host {
      background-color: var(--gray-dark);
      border-radius: 5px;
      display: flex;
      flex-flow: row wrap;
      padding: 3px;  
    }
    :host > * {
      margin: 3px;
    }

  `
  @property({ attribute: false })
  item: TSiteItem
  siteId: string

  render() {
    let { logins } = this.item.data
    let idList = []
    for (let id in logins) {
      if (id != 'form') idList.push(id)
    }
    return html`
      <div id="wrapper">
        <site-item
          .item=${this.item}
          .siteId=${this.siteId}
        ></site-item>
      </div>
      ${repeat(idList, id => id, id => html`
        <login-item
          .item=${logins[id]}
          .siteId=${this.siteId}
          .loginId=${id}
        ></login-item>
      `)}
      <div id="wrapper">
        <login-form
          .form=${logins.form}
          .siteId=${this.siteId}
          .inputType=${'LOGIN_CREATE_CHANGE'}
          .submitType=${'LOGIN_CREATE_SUBMIT'}
        ></login-form>
      </div>
    `
  }
}