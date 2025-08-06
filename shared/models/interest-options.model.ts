type InterestOptionValue = {
  value: "VALUE_CALENDAR_DAYS" | "PERCENTAGE_PER_DAY_CALENDAR_DAYS";
  label: string;
};

export type InterestModalityType =
  | "VALUE_CALENDAR_DAYS"
  | "PERCENTAGE_PER_DAY_CALENDAR_DAYS";

const INTEREST_OPTIONS: InterestOptionValue[] = [
  {
    value: "VALUE_CALENDAR_DAYS",
    label: "Valor monetário de juros por dia",
  },
  {
    value: "PERCENTAGE_PER_DAY_CALENDAR_DAYS",
    label: "Porcentagem de juros por dia",
  },
];

export default INTEREST_OPTIONS;
