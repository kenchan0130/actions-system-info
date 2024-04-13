import getos from "getos";

export const getosAsync = (): Promise<getos.Os> =>
  new Promise((resolve, reject) =>
    getos((e, os) => (e ? reject(e) : resolve(os))),
  );
