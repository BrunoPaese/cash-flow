import { createContext } from "react";
import type { Customer } from "./CustomerProvider";
import type { CustomerFormData } from "../../components/CustomerFormCard";

export interface CustomerContextData {
  getCustomer: (identifier: string) => Promise<Customer | undefined>;
  addCustomer: (customer: CustomerFormData) => Promise<Customer | undefined>;
  confirmCustomer: (custumer?: Customer) => void;
}

export const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData,
);
