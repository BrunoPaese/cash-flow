import { api } from "../../api/api";
import type { Cashier } from "./CashierContext";

export const getCashierById = async (id: number): Promise<Cashier> => {
  const response = await api.get<Cashier>(`/cashier/${id}`);
  return response.data;
};
