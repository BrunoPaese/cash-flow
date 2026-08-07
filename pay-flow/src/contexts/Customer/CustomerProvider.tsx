import { type ReactNode } from "react";
import { CustomerContext } from "./CustomerContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";
import type {
  Address,
  CustomerFormData,
} from "../../components/CustomerFormCard";
import { getCustomerByIdentifier, postCustomer } from "./customer.service";

export interface Customer {
  identifier: string;
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  photoUrl?: string;
  addresses: Address[];
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const getCustomer = async (
    identifier: string,
  ): Promise<Customer | undefined> => {
    const customer = await getCustomerByIdentifier(identifier);
    return customer;
  };

  const addCustomer = async (
    customer: CustomerFormData,
  ): Promise<Customer | undefined> => {
    const newCustomer = await postCustomer(customer);
    return newCustomer;
  };

  const confirmCustomer = async (customer?: Customer) => {
    setCheckout((prev) => ({
      ...prev,
      customer,
    }));
    toast.success(t("custumer.submitCustomer"));
  };

  return (
    <CustomerContext.Provider
      value={{
        getCustomer,
        addCustomer,
        confirmCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
