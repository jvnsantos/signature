interface PaymentModel {
  id: string;
  externalId: string;
  company: {
    companyId: string;
    cnpj: string;
    name: string;
  };
  payer: {
    payerId: string;
    taxPayerId: string;
    name: string;
  };
  taxPayerId: string;
  title: string;
  description: string;
  status: string;
  paidDate: string | null;
  amountPaid: number | null;
  amount: number;
  dueDate: string;
  isAutomaticDebit: boolean;
  isPixCashIn: boolean;
  howWasitPaid: string | null;
  amountInterest: {
    hasInterest: boolean;
    amountPerc: number;
    modality: string;
  };
  amountFine: {
    hasFine: boolean;
    amountPerc: number;
    modality: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  qrCodePixCashin: {
    id: string;
    locationId: string;
    amount: number;
    status: string;
    statusPayment: string;
    duedate: string;
    url: string;
    emv: string;
    type: string;
    calendarExpirationAfterPayment: number;
    calendarCreatedAt: string;
    calendarDueDate: string;
  };
}
