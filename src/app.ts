import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./lib/pg-widget";

@customElement("app-root")
export class App extends LitElement {
  render() {
    return html`<pg-widget />`;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    @media (prefers-color-scheme: light) {
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": App;
  }
}
