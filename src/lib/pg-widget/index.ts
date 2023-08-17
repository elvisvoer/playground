import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { variables, bgGray100, container, flex, flex1 } from "./ui/css";

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [variables, bgGray100, container, flex, flex1];

  render() {
    return html`
      <div class="flex container">
        <div class="flex-1">One</div>
        <div class="flex-1 bg-gray-100">Two</div>
      </div>
    `;
  }
}
