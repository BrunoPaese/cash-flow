import { createContext } from "react";
import type { Shipping } from "./ShippingProvider";
import type { ShippingFormData } from "../../components/ShippingFormCard";

export interface ShippingContextData {
  loading: boolean;
  getShipping: (id: string) => Promise<Shipping | undefined>;
  addShipping: (shipping: ShippingFormData) => Promise<Shipping | undefined>;
  confirmShipping: (shipping: Shipping) => void;
}

export const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData,
);
