import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Account, Company, User } from "./interfaces";
import { PaymentConfigModel } from "@/shared/models/payment-config.model";

export interface UserContextData {
  setUser: Dispatch<SetStateAction<User>>;
  user: User;

  setCompany: Dispatch<SetStateAction<Company>>;
  company: Company;

  account: Account;
  setAccount: Dispatch<SetStateAction<Account>>;

  companies: Company[];
  setCompanies: Dispatch<SetStateAction<Company[]>>;

  payOutModalShow: boolean
  setPayOutModalShow: Dispatch<SetStateAction<boolean>>;

  setPaymentConfig: Dispatch<SetStateAction<PaymentConfigModel>>;
  paymentConfig: PaymentConfigModel;

}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User);
  const [company, setCompany] = useState({} as Company);
  const [companies, setCompanies] = useState([] as Company[]);
  const [account, setAccount] = useState({} as Account);
  const [payOutModalShow, setPayOutModalShow] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfigModel>({} as PaymentConfigModel)

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        company,
        setCompany,
        companies,
        setCompanies,
        account,
        setAccount,
        payOutModalShow,
        setPayOutModalShow,
        paymentConfig,
        setPaymentConfig,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserProvider;
