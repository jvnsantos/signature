export type PaymentConfigModel = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  status: string;
  expirationInDays: number;
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
  amountRate: {
    hasRate: boolean;
    amount: number;
    modality: string;
  };
  hasApplyProtest: boolean;
  hasApplyProtestCron: boolean;
  hasCronSyncPaid: boolean;
  filterCronSyncPaid: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
