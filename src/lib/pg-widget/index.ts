import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("pg-widget")
export class PGWidget extends LitElement {
  render() {
    return html` <h1>Hello playground</h1> `;
  }
}
