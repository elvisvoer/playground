const defaultStyle = {
  color: "var(--color-gray-100)",
  "white-space": "pre-wrap",
};

export class HTMLConsoleDriver {
  constructor(private rootNode: Element) {}

  public write(style?: { color: string }, ...data: string[]) {
    const s = { ...defaultStyle, ...(style || {}) };
    const prefix = `<span style="${Object.entries(s)
      .map(([key, val]) => `${key}: ${val};`)
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

  debug(...args: any[]) {
    this.driver.writeln(undefined, ...args);
  }

  info(...args: any[]) {
    args.unshift("&#x1F6C8;");
    this.driver.writeln(undefined, ...args);
  }

  error(...args: any[]) {
    args.unshift("&#x1F6C8;");
    this.driver.writeln(
      {
        color: "var(--color-red-800)",
      },
      ...args
    );
  }

  dir(...args: unknown[]) {
    args.forEach((arg) => {
      if (typeof arg === "string") {
        this.driver.write(undefined, arg, " ");
        return;
      }

      if (typeof arg === "object") {
        const formatted = JSON.stringify(arg, undefined, 2);
        const lines = formatted.split("\n");
        lines.forEach((line) => {
          this.driver.writeln(undefined, line);
        });

        return;
      }

      throw new Error("console.dir unknown type: " + typeof arg);
    });
  }
}
