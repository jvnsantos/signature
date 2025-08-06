type RateOptionsProps = {
  value: "FIXED_VALUE" | "PERCENT";
  label: string;
  disable?: boolean;
};

export type RateModalityTypes = "FIXED_VALUE" | "PERCENT";

const RATE_OPTIONS: RateOptionsProps[] = [
  { value: "FIXED_VALUE", label: "Valor monetário" },
];

export default RATE_OPTIONS;
