export class HTMLConsoleDriver {
  constructor(private rootNode: Element) {}

  public write(...data: string[]) {
    this.rootNode.innerHTML += data.join(" ");
  }

  public writeln(...data: string[]) {
    this.write(...data);
    this.write("<br />");
  }

  public clear() {
    this.rootNode.innerHTML = "";
  }
}

export class VirtualConsole {
  constructor(private driver: HTMLConsoleDriver) {
    this.driver.writeln("Virtual Console initialized!");
  }

  log(...args: any[]) {
    this.driver.writeln(...args);
  }
}
