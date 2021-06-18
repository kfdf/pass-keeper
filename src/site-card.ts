import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import * as styles from './styles'
import { TSiteData } from './types'

@customElement('site-card')
class SiteCard extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.card}
    #card {
      cursor: pointer;
      background-color: var(--gray-light);
    }
    #card:hover {
      background-color: var(--gray-dark);
    }
    #title {
      word-break: break-all;
    }    
  `
  @property({ attribute: false })
  data: TSiteData
  @state()
  loginCount: number  
  siteId: number
  willUpdate() {
    let count = 0
    for (let id in this.data.logins) {
      if (id != 'form') count += 1
    }    
    this.loginCount = count
  }
  handleClick = e => {
    this.dispatchEvent(new CustomEvent('dispatch', {
      bubbles: true, composed: true,
      detail: { 
        type: 'LOGIN_CREATE_TOGGLE',
        siteId: this.siteId
      }
    }))
  }
  render() {
    let { name, passLength } = this.data
    return html`
      <div id="card" @click=${this.handleClick}>
        <div id="title">${name}</div>
        ${passLength && html`
          <div><small>Password size: ${passLength}</small></div>
        `}
        <div><small>Login count: ${this.loginCount}</small></div>
      </div>
    `
  }
}