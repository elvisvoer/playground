import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { container, flex, flex1 } from "./ui/css";

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [flex, flex1, container];

  render() {
    return html`
      <div class="flex container">
        <div class="flex-1">One</div>
        <div class="flex-1">Two</div>
      </div>
    `;
  }
}
