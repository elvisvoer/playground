import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import {
  variables,
  bgGray800,
  block,
  border,
  borderGray700,
  hoverBgGray700,
  p6,
  roundedLg,
  shadow,
  wFull,
} from "./css";

@customElement("pg-card")
export class PGCard extends LitElement {
  static styles = [
    variables,
    bgGray800,
    block,
    border,
    borderGray700,
    hoverBgGray700,
    p6,
    roundedLg,
    shadow,
    wFull,
  ];

  protected render() {
    return html`
      <div
        class="block w-full p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700"
      >
        <slot></slot>
      </div>
    `;
  }
}
