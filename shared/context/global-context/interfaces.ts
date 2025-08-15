export type DeliveryData = {
  delivery: Delivery;
  client: Client;
  company: Company;
  invoices: Invoice[];
};

export type Delivery = {
  id: string;
  driverId: string;
  companyId: string;
  integrationId: string | null;
  status: "PENDING" | "DELIVERED" | string;
  receiverName: string | null;
  receiverTaxIdentifier: string | null;
  deviceIp: string | null;
  bucketPathImageSignature: string | null;
  bucketPathPDFSignature: string | null;
  longitude: number;
  latitude: number;
  precisionGps: number | null;
  dateRequestSignature: string | null;
  dateSignature: string | null;
  observation: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  driver: Driver;
  attachments: DeliveryAttachment[];
  driverRouter: string;
};

export type Driver = {
  id: string;
  name: string;
  code: string;
  companyId: string;
  userId: string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type DeliveryAttachment = {
  id: string;
  deliveryId: string;
  attachmentId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  attachment: Attachment;
};

export type Attachment = {
  id: string;
  bucketPath: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Client = {
  id: string;
  code: string;
  name: string;
  fantasyName: string;
  taxPayerId: string;
  address: Address;
};

export type Address = {
  id: string;
  postalCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  longitude: string;
  latitude: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Company = {
  companyId: string;
  email: string;
  taxIdentifier: string;
  name: string;
  fantasyName: string;
  logoUrl: string;
};

export type Invoice = {
  invoice: string;
  description: string;
  ordering: number;
  url: string;
};

export type ReaseonToCancelProps = {
  reasonNotDelivery: string;
  observation?: string;
};
