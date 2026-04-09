import { useState, type ReactNode } from "react";
import { CustomerContext } from "./CustomerContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";

export interface Customer {
  identifier: string;
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  adress?: string;
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const getCustomer = async (
    identifier: string,
  ): Promise<Customer | undefined> => {
    try {
      // carrega o cliente pelo identificador
      // mock
      const customer = {
        identifier,
        name: "Bruno Paese",
        phone: "54999999999",
        email: "bruno@gmail.com",
        country: "BR",
        adress: "Faria Lima, 999, Pinheiros, São Paulo",
      };
      return customer;
    } catch {
      toast.error(t("customer.errorGetCustomer"));
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
        confirmCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
