export const spillCode: any = (s: any) => {
  return `${s["one"].current?.value ?? ""}${s["two"].current?.value ?? ""}${
    s["three"].current?.value ?? ""
  }${s["four"].current?.value ?? ""}${s["five"].current?.value ?? ""}${
    s["six"].current?.value ?? ""
  }`;
};
