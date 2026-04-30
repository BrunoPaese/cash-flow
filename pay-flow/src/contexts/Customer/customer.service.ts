import { api } from "../../api/api";
import type { CustomerFormData } from "../../components/CustomerFormCard";
import type { Customer } from "./CustomerProvider";

export const getCustomerById = async (id: number): Promise<Customer> => {
  const response = await api.get<Customer>(`/customer/${id}`);
  return response.data;
};

export const postCustomer = async (
  customer: CustomerFormData,
): Promise<Customer> => {
  const response = await api.post<Customer>("/customer/add", customer);
  return response.data;
};
