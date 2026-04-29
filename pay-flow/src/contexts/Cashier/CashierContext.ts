import { createContext } from "react";
import type { CashierFormData } from "../../components/CashierFormCard";

export interface Cashier {
  id?: number;
  name?: string;
  rating?: number;
}

export interface CashierContextType {
  loading: boolean;
  getCashier: (id: number) => Promise<Cashier | undefined>;
  addCashier: (cashier: CashierFormData) => Promise<Cashier | undefined>;
  confirmCashier: (cashier?: Cashier) => void;
}

export const CashierContext = createContext<CashierContextType>(
  {} as CashierContextType,
);
