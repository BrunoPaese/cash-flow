import { api } from "../../api/api";
import type { CashierFormData } from "../../components/CashierFormCard";
import type { Cashier } from "./CashierContext";

export const getCashierById = async (id: number): Promise<Cashier> => {
  const response = await api.get<Cashier>(`/cashier/${id}`);
  return response.data;
};

export const addCashier = async (
  cashier: CashierFormData,
): Promise<Cashier> => {
  const response = await api.post<Cashier>("/cashier/new", cashier);
  return response.data;
};
