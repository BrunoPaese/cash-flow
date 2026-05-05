import { useState, type ReactNode } from "react";
import { ShippingContext } from "./ShippingContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";
import type { ShippingFormData } from "../../components/ShippingFormCard";
import { getShippingById, postShipping } from "./shipping.service";

export interface Shipping {
  hasShipping: boolean;
  type?: string;
  deliveryTime?: string;
  freight?: number;
}

export function ShippingProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const getShipping = async (id: string): Promise<Shipping | undefined> => {
    try {
      const shipping = await getShippingById(id);
      return shipping;
    } catch {
      toast.error(t("shipping.errorGetShipping"));
    } finally {
      setLoading(false);
    }
  };

  const addShipping = async (
    shipping: ShippingFormData,
  ): Promise<Shipping | undefined> => {
    setLoading(true);
    try {
      const newShipping = await postShipping(shipping);
      return newShipping;
    } catch {
      toast.error(t("shipping.errorAddShipping"));
    } finally {
      setLoading(false);
    }
  };

  const confirmShipping = async (shipping: Shipping) => {
    setCheckout((prev) => ({
      ...prev,
      shipping,
    }));
    toast.success(t("shipping.submitShipping"));
  };

  return (
    <ShippingContext.Provider
      value={{
        loading,
        getShipping,
        addShipping,
        confirmShipping,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}
