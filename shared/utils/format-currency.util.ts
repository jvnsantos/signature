const formatCurrencyUtils = (value: any) => {
  try {
    const raw = typeof value === "string" ? parseFloat(value) : value;

    const float_parsed = parseFloat(raw.toFixed(2));

    const splited_values = float_parsed.toString().split(".");

    let real_value_part = splited_values[0];
    let cents_value_part = splited_values[1] || "00";

    if (cents_value_part.length === 1) {
      cents_value_part = `${cents_value_part}0`;
    }

    real_value_part = real_value_part.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedFinal = `R$ ${real_value_part},${cents_value_part}`;

    return formattedFinal;
  } catch (error) {
    console.log(error);
    return value;
  }
};

export default formatCurrencyUtils;
