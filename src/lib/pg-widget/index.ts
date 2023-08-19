import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref, Ref, createRef } from "lit/directives/ref.js";
import { variables, bgGray900, container, flex, flex1 } from "./ui/css";

import { VirtualConsole, HTMLConsoleDriver } from "./console";
import { evalSafe } from "./javascript";

@customElement("pg-widget")
export class PGWidget extends LitElement {
  static styles = [variables, bgGray900, container, flex, flex1];

  consoleRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`
      <div class="flex container">
        <div class="flex-1">One</div>
        <div class="flex-1 bg-gray-900" ${ref(this.consoleRefUpdated)}></div>
      </div>
    `;
  }

  private consoleRefUpdated(ref?: Element) {
    if (!ref) {
      return;
    }

    evalSafe("console.log('foo'); console.error('something went wrong')", {
      console: new VirtualConsole(new HTMLConsoleDriver(ref)),
    });
  }
}
