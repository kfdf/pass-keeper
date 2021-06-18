import { css } from 'lit'
export const reset = css`
  :host {
    display: block;
  }
  * {
    margin: 0;
    box-sizing: border-box;
  }
`
export const card = css`
  #card {
    padding: 3px;
    border-radius: 5px;
    width: 10rem;
    border: 2px solid var(--gray-dim);
    font-family: sans-serif;
  }
`
export const buttonOverlay = css`
  #wrapper {
    position: relative;
    overflow: hidden;
  }
  #wrapper:hover > #buttons {
    transform: none;
    z-index: 10;
  }
  #buttons {
    position: absolute;
    padding: 0;
    top: 2px;
    right: 10px;
    display: flex;
    transform: translateY(calc(-100% - 2px));
    transition: transform 0.2s;
  }
  #buttons button {
    font-size: 0.6em;
  }  
`
export const form = css`
  #card {
    position: relative;
    overflow: hidden;
    background-color: var(--gray-light);
  }
  #card.error {
    border-color: red;
    text-align: center;
  }
  #error {
    position: absolute;
    background-color: red;
    display: flex;
    color: white;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 3px;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    transition: transform 0.2s;
  }
  #error.show {
    transform: translateY(0);
  }  
  label {
    cursor: pointer;
    font-size: 0.8rem;
    text-align: left;
    display: block;  
    padding-left: 5px;    
  } 
  input {
    width: 100%;
    border: 2px solid var(--gray);
    outline: none;
    font-size: inherit;
  }
  input:-webkit-autofill::first-line {
    font-size: 1rem;
  }  
  fieldset {
    padding: 3px;
    border: 0;
  }
  fieldset:hover > label {
    font-weight: semibold;
  }
  fieldset:hover > input {
    background-color: var(--gray-light);
    border-color: var(--gray-dark);
  }
  fieldset:focus-within > label {
    font-weight: bold;
  }
  fieldset:focus-within > input {
    background-color: var(--gray);
    border-color: var(--gray-dim);
  } 
`
