import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { container, flex, flex1, gap4 } from "./ui/css";

import { VirtualConsole, HTMLConsoleDriver } from "./console";
import { evalSafe } from "./javascript";

import "./ui/card";
import "./ui/textarea";

type Context = {
  console: VirtualConsole;
  window: Context;
};

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [container, flex, flex1, gap4];

  virtualConsole?: VirtualConsole;

  render() {
    return html`
      <div class="flex container gap-4">
        <div class="flex-1">
          <pg-card>
            <pg-textarea
              label="JavaScript"
              placeholder="console.log('Hello, world!');"
              @input="${(event: any) => {
                this.virtualConsole?.clear();
                try {
                  this.run(event.originalTarget?.value || "");
                } catch (err: any) {
                  this.virtualConsole?.error(err.message);
                }
              }}"
            ></pg-textarea>
          </pg-card>
        </div>
        <div class="flex-1">
          <pg-card><div ${ref(this.consoleRefUpdated)}></div></pg-card>
        </div>
      </div>
    `;
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

  private consoleRefUpdated(ref?: Element) {
    if (!ref) {
      return;
    }

    this.virtualConsole = new VirtualConsole(new HTMLConsoleDriver(ref));
  }
}
