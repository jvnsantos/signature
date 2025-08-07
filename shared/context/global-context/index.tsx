import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Client, Company, Delivery, Invoice } from "./interfaces";

export interface GlobalContextData {
  setClient: Dispatch<SetStateAction<Client>>;
  client: Client;

  setCompany: Dispatch<SetStateAction<Company>>;
  company: Company;

  setDelivery: Dispatch<SetStateAction<Delivery>>;
  delivery: Delivery;

  setInvoice: Dispatch<SetStateAction<Invoice[]>>;
  invoice: Invoice[];

  showHeader: boolean;
  setShowHeader: Dispatch<SetStateAction<boolean>>

  selectedInvoice: string
  setSelectedInvoice: Dispatch<SetStateAction<string>>

  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

const GlobalProvider = ({ children }: any) => {
  const [client, setClient] = useState({} as Client);
  const [company, setCompany] = useState({} as Company);
  const [delivery, setDelivery] = useState({} as Delivery);
  const [invoice, setInvoice] = useState([] as Invoice[]);
  const [showHeader, setShowHeader] = useState<boolean>(false)
  const [selectedInvoice, setSelectedInvoice] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<number>(0)

  return (
    <GlobalContext.Provider
      value={{
        showHeader,
        setShowHeader,
        client,
        setClient,
        company,
        setCompany,
        delivery,
        setDelivery,
        invoice,
        setInvoice,
        selectedInvoice,
        setSelectedInvoice,
        currentStep,
        setCurrentStep
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalProvider;
