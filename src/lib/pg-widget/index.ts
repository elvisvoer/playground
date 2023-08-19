import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { container, flex, flex1, gap4, wFull } from "./ui/css";

import { VirtualConsole, HTMLConsoleDriver } from "./console";
import { evalSafe } from "./javascript";

import "./ui/card";

type Context = {
  console: VirtualConsole;
  window: Context;
};

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [container, flex, flex1, gap4, wFull];

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
        <div class="flex-1">
          <pg-card><div ${ref(this.consoleRefUpdated)}></div></pg-card>
        </div>
      </div>
    `;
  }

  protected firstUpdated(): void {
    this.run(String(this.inputElement?.textContent));
  }

  private run(code: string) {
    const context: Context = {
      console: this.virtualConsole as VirtualConsole,
      // we will initialize window on the line after so it's safe to have it null here
      window: null as unknown as Context,
    };
    context.window = context;

    evalSafe(code, context);
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
