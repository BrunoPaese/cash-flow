import { createContext } from "react";

export interface Cashier {
  id?: number;
  name?: string;
  rating?: number;
}

export interface CashierContextType {
  loading: boolean;
  getCashier: (id: number) => Promise<Cashier | undefined>;
  confirmCashier: (cashier?: Cashier) => void;
}

export const CashierContext = createContext<CashierContextType>(
  {} as CashierContextType,
);
