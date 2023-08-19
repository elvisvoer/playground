const defaultContext: any = {
  console,
};

export function evalSafe(code: string, ctx = defaultContext) {
  new Function(...Object.keys(ctx), code).bind(ctx)(...Object.values(ctx));
}
