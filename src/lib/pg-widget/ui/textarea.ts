import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  bgGray700,
  block,
  border,
  borderGray600,
  boxBorder,
  focusBorderBlue500,
  focusRingBlue500,
  fontMedium,
  mb2,
  p2,
  placeholderGray400,
  roundedLg,
  textSm,
  textWhite,
  wFull,
} from "./css";

@customElement("pg-textarea")
export class TextArea extends LitElement {
  static styles = [
    bgGray700,
    block,
    border,
    borderGray600,
    boxBorder,
    focusBorderBlue500,
    focusRingBlue500,
    fontMedium,
    mb2,
    p2,
    placeholderGray400,
    roundedLg,
    textSm,
    textWhite,
    wFull,
  ];

  @property()
  placeholder: string = "";

  @property()
  label: string = "";

  render() {
    return html`
      <label for="message" class="block mb-2 text-sm font-medium text-white"
        >${this.label}</label
      >
      <textarea
        id="message"
        rows="4"
        class="box-border block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-400 focus-border-blue-500 focus-ring-blue-500"
        placeholder="${this.placeholder}"
      ></textarea>
    `;
  }
}
