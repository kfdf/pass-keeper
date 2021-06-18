import './site-form'
import './site-item'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit-html/directives/repeat'
import * as styles from './styles'
import { TSiteList } from './types'


@customElement('pass-keeper')
export class PassKeeper extends LitElement {
  static styles = css`
    ${styles.reset}
    :host {
      --gray-light: #eee;
      --gray: #ccc;
      --gray-dark: #bbb;
      --gray-dim: #888;
    }

    #site-list {
      display: flex;
      flex-flow: row wrap;
      text-align: center;
      padding: 6px;
    }
    site-form, site-item {
      margin: 3px;
    }
    site-item[data-expanded] {
      width: calc(100% + 6px);
      margin-left: -3px;
      margin-right: -3px;
    }    
  `
  @property({ attribute: false }) 
  state: TSiteList

  render() {
    let { form } = this.state
    let idList = []
    for (let id in this.state) {
      if (id !== 'id' && id !== 'form') idList.push(id)
    }
    return html`
      <div id="site-list">
        ${repeat(idList, id => id, id => html`
          <site-item
            .item=${this.state[id]}
            .siteId=${id}
            .expandable=${true}
          ></site-item>
        `)}
        <site-form
          .form=${form}
          .inputType=${'SITE_CREATE_CHANGE'}
          .submitType=${'SITE_CREATE_SUBMIT'}          
        ></site-form>
      </div>
    `
  }
}
