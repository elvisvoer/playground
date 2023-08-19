import { LitElement, PropertyValueMap, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import {
  variables,
  bgGray900,
  container,
  flex,
  flex1,
  gap4,
  wFull,
} from "./ui/css";

import { VirtualConsole, HTMLConsoleDriver } from "./console";
import { evalSafe } from "./javascript";

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [variables, bgGray900, container, flex, flex1, gap4, wFull];

  inputElement?: Element;
  virtualConsole?: VirtualConsole;

  render() {
    return html`
      <div class="flex container gap-4">
        <div class="flex-1">
          <textarea
            class="w-full"
            ${ref(this.inputElementRefUpdated)}
            @input="${(event: any) => {
              this.virtualConsole?.clear();
              try {
                this.run(event.target?.value || "");
              } catch (err: any) {
                this.virtualConsole?.error(err.message);
              }
            }}"
          ></textarea>
        </div>
        <div class="flex-1 bg-gray-900" ${ref(this.consoleRefUpdated)}></div>
      </div>
    `;
  }

  protected firstUpdated(): void {
    this.run(String(this.inputElement?.textContent));
  }

  private run(code: string) {
    evalSafe(code, {
      console: this.virtualConsole,
    });
  }

  private inputElementRefUpdated(ref?: Element) {
    if (!ref) {
      return;
    }

    this.inputElement = ref;
  }

  private consoleRefUpdated(ref?: Element) {
    if (!ref) {
      return;
    }

    this.virtualConsole = new VirtualConsole(new HTMLConsoleDriver(ref));
  }
}
