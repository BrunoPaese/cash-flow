import { useState, type ReactNode } from "react";
import { CashierContext, type Cashier } from "./CashierContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";
import { getCashierById } from "./cashier.service";

export function CashierProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const [loading, setLoading] = useState(false);

  const getCashier = async (id: number): Promise<Cashier | undefined> => {
    setLoading(true);
    try {
      const cashier = await getCashierById(id);
      return cashier;
    } catch {
      toast.error(t("cashier.errorGetCashier"));
    } finally {
      setLoading(false);
    }
  };

  const confirmCashier = (cashier?: Cashier) => {
    setCheckout((prev) => ({
      ...prev,
      cashier,
    }));

    toast.success(t("cashier.submitCashier"));
  };

  return (
    <CashierContext.Provider
      value={{
        loading,
        getCashier,
        confirmCashier,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}
