type FineOptionValue = {
  value: "FIXED_VALUE" | "PERCENT";
  label: string;
};

export type FineModalityType = "FIXED_VALUE" | "PERCENT";

const FINE_OPTIONS: FineOptionValue[] = [
  { value: "FIXED_VALUE", label: "Valor monetário de multa fixado" },
  { value: "PERCENT", label: "Valor percentual de multa" },
];

export default FINE_OPTIONS;
