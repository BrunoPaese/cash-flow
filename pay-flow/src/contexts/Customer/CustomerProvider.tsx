import { useState, type ReactNode } from "react";
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

  const [loading, setLoading] = useState<boolean>(false);

  const getCustomer = async (
    identifier: string,
  ): Promise<Customer | undefined> => {
    const customer = await getCustomerByIdentifier(identifier);
    return customer;
  };

  const addCustomer = async (
    customer: CustomerFormData,
  ): Promise<Customer | undefined> => {
    setLoading(true);
    try {
      const newCustomer = await postCustomer(customer);
      toast.success(t("customer.successAddCustomer"));
      return newCustomer;
    } catch {
      toast.error(t("customer.errorAddCustomer"));
    } finally {
      setLoading(false);
    }
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
        loading,
        getCustomer,
        addCustomer,
        confirmCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
