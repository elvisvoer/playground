import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import {
  variables,
  bgGray800,
  block,
  border,
  borderGray700,
  p6,
  roundedLg,
  shadow,
} from "./css";

@customElement("pg-card")
export class PGCard extends LitElement {
  static styles = [
    variables,
    bgGray800,
    block,
    border,
    borderGray700,
    p6,
    roundedLg,
    shadow,
  ];

  protected render() {
    return html`
      <div
        class="block p-6 bg-gray-800 border border-gray-700 rounded-lg shadow"
      >
        <slot></slot>
      </div>
    `;
  }
}
