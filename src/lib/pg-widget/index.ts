import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import {
  variables,
  border,
  borderGray700,
  container,
  flex,
  flexWrap,
  flex48p,
  gap4,
  hFull,
} from "./ui/css";

import { VirtualConsole, HTMLConsoleDriver } from "./console";
import { evalSafe } from "./javascript";

import "./ui/card";
import "./ui/textarea";

type Context = {
  console: VirtualConsole;
  document: ShadowRoot;
  window: Context;
};

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [
    variables,
    border,
    borderGray700,
    container,
    flex,
    flexWrap,
    flex48p,
    gap4,
    hFull,
  ];

  root?: ShadowRoot;
  virtualConsole?: VirtualConsole;

  render() {
    return html`
      <div class="flex flex-wrap container gap-4">
        <div class="flex-48p">
          <pg-card>
            <pg-textarea
              label="HTML"
              placeholder="<p>Hello, world!</p>"
              @input="${(event: any) => {
                if (!this.root) {
                  return;
                }

                this.root.innerHTML = "";
                this.root.innerHTML = event.originalTarget.value;
              }}"
            ></pg-textarea>
          </pg-card>
        </div>
        <div class="flex-48p">
          <div
            class="h-full border border-gray-700"
            ${ref(this.documentRefUpdated)}
          ></div>
        </div>
        <div class="flex-48p">
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
        <div class="flex-48p">
          <pg-card><div ${ref(this.consoleRefUpdated)}></div></pg-card>
        </div>
      </div>
    `;
  }

  private run(code: string) {
    const context: Context = {
      console: this.virtualConsole as VirtualConsole,
      document: this.root as ShadowRoot,
      // we will initialize window on the line after so it's safe to have it null here
      window: null as unknown as Context,
    };
    context.window = context;

    evalSafe(code, context);
  }

  private documentRefUpdated(ref?: Element) {
    if (!ref) {
      return;
    }

    const shadow = ref.attachShadow({ mode: "open" });
    this.root = shadow;
  }

  private consoleRefUpdated(ref?: Element) {
    if (!ref) {
      return;
    }

    this.virtualConsole = new VirtualConsole(new HTMLConsoleDriver(ref));
  }
}
