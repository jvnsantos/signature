declare module 'format-currency' {
  function formatCurrency(
    value: number,
    options?: {
      format?: string;
      symbol?: string;
      decimal?: string;
      precision?: number;
    }
  ): string;

  export = formatCurrency;
}
