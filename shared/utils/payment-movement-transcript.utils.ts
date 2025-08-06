export const PaymentMovementTrasncript = (status: string) => {
  switch (status) {
    case "PIXPAYMENTIN":
    case "PIXPAYMENTOUT":
      return "PIX";
    case "INTERNALTRANSFERIN":
    case "INTERNALTRANSFEROUT":
      return "TRANSAÇÃO INTERNA";

    default:
      return status;
  }
};
