export interface Company {
  id: string;
  fantasyName: string;
  taxIdentifier: string;
  type: string; //PF PJ
  followUp?: FollowUpType;
}

export interface User {
  fullName: string;
  email: string;
  phone: string;
  roles: string[];
}

export interface FollowUpType {
  id: string;
  name: string;
}
export interface Account {
  account: string;
  branch: string;
  balance: number;
  isConfigPayout: boolean;
}
