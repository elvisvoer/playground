export class HTMLConsoleDriver {
  constructor(private rootNode: Element) {}

  public write(style?: { color: string }, ...data: string[]) {
    const s = style || { color: "var(--color-gray-100)" };
    const prefix = `<span style="${Object.entries(s)
      .map(([key, val]) => `${key}: ${val}`)
      .join(" ")}">`;
    const suffix = `</span>`;
    this.rootNode.innerHTML += `${prefix}${data.join(" ")}${suffix}`;
  }

  public writeln(style?: { color: string }, ...data: string[]) {
    this.write(style, ...data);
    this.write(undefined, "<br />");
  }

  public clear() {
    this.rootNode.innerHTML = "";
  }
}

export class VirtualConsole {
  constructor(private driver: HTMLConsoleDriver) {
    this.driver.writeln(undefined, "Virtual Console initialized!");
  }

  log(...args: any[]) {
    this.driver.writeln(undefined, ...args);
  }
}
