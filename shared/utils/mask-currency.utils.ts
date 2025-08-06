const maskCurrency = (value: string, noPrefix?: boolean) => {
  try {
    let numberValue = value.replace(/\D/g, "");

    numberValue = (Number(numberValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    if (noPrefix) {
      return numberValue.replace("R$", "");
    }
    return numberValue;
  } catch {
    return value;
  }
};

export default maskCurrency;
