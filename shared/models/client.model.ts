export interface ClientModel {
  client: {
    createdAt: string;
    deletedAt: string | null;
    email: string;
    fantasyName: string;
    id: string;
    name: string;
    phone: string;
    taxPayerId: string;
    type: "PJ" | "PF";
    updatedAt: string;
    code?: string;
    config?: any;
  };
}

export interface ClientAddress {
  id?: string;
  postalCode: string;
  street: string;
  number: string;
  neighborhood?: string;
  city: string;
  state: string;
  complement?: string;
  longitude?: string;
  latitude?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

// Interface para o cliente
export interface Client {
  id: string;
  type: "PF" | "PJ";
  status: "ACTIVE" | "INACTIVE";
  name: string;
  fantasyName: string;
  email?: string;
  taxPayerId: string;
  phone: string;
  representativeId?: string;
  addressId: string;
  accountId: string;
  createdUserId?: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  address: ClientAddress;
  code?: string;
}
