const maskPercentage = (value: string): string => {

  let numberValue = value.replace(",", ".").replace(/[^0-9.]/g, "");

  const parts = numberValue.split(".");
  if (parts.length > 2) {
    numberValue = parts[0] + "." + parts.slice(1).join("");
  }

  if (numberValue.includes(".")) {
    const [integer, decimal] = numberValue.split(".");
    numberValue = integer + "." + decimal.slice(0, 6);
  }

  return numberValue;
};

export default maskPercentage;
