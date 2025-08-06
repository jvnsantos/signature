async function findBankNameBtIsbp(ispb: string) {
  const url = `https://brasilapi.com.br/api/banks/v1`;

  try {
    const response = await fetch(url);
    const arrayOfBanks = await response.json();

    const bank = arrayOfBanks.find((b: any) => b.ispb === ispb);
    if (bank) {

      return bank.fullName;
    } else {
      console.log("bank not found");
      return ispb;
    }
  } catch (error) {
    console.error("internal server error:", error);
    return ispb;
  }
}

export default findBankNameBtIsbp;
