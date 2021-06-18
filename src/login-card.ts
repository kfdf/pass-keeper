import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import * as styles from './styles'
import { TLoginData } from './types'

@customElement('login-card')
export class LoginCard extends LitElement {
  static styles = css`
    ${styles.reset}
    ${styles.card}
    #card {
      background-color: var(--gray-light);
      text-align: left;
    }
    .item {
      position: relative;
      cursor: pointer;
      padding: 3px;
      border-radius: 5px;
    }
    .item:hover {
      background-color: var(--gray);
    }  
    .item::after {
      content: 'Saved to clipboard';
      position: absolute;
      overflow: hidden;
      text-align: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: darkcyan;
      color: white;
      visibility: hidden;
      opacity: 0;
      transition-duration: 0.3s;
      transition-property: visibility, opacity, transform;
      transform: scale(1.1);
    }
    .item.note::after {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    }
    .title {
      font-size: 0.8rem;
      text-align: left;   
      padding-left: 5px;   
    }
    .value {
      width: 100%;
      padding: 3px 4px;
      min-height: 1em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;      
    }
  `
  clickHandler = async e => {
    let target = e.target.closest('[data-key]')
    if (!(target instanceof HTMLDivElement)) return
    e.preventDefault()
    let value = this.data[target.dataset.key]
    await navigator.clipboard.writeText(value)
    if (target.classList.contains('note')) return
    target.classList.add('note')
    await new Promise(r => setTimeout(r, 400))
    target.classList.remove('note')
  }
  @property({ attribute: false })
  data: TLoginData
  render() {
    let { name, password, email } = this.data
    return html`
      <div id="card" @click=${this.clickHandler}>
        <div class="item" data-key="name">
          <div class="title">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="item" data-key="password">
          <div class="title">Password</div>
          <div class="value">${password}</div>
        </div>
        ${email && html`
          <div class="item" data-key="email">
            <div class="title">Email</div>
            <div class="value">${email}</div>
          </div>        
        `}
      </div>
    `
  }
}