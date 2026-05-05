import { api } from "../../api/api";
import type { ShippingFormData } from "../../components/ShippingFormCard";
import type { Shipping } from "./ShippingProvider";

export const getShippingById = async (id: string): Promise<Shipping> => {
  const response = await api.get<Shipping>(`/shipping/${id}`);
  return response.data;
};

export const postShipping = async (
  shipping: ShippingFormData,
): Promise<Shipping> => {
  const response = await api.post<Shipping>("/shipping/add", shipping);
  return response.data;
};
