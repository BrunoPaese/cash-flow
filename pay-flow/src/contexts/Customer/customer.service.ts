import { api } from "../../api/api";
import type { CustomerFormData } from "../../components/CustomerFormCard";
import { onlyNumbers } from "../../utils/onlyNumbers";
import type { Customer } from "./CustomerProvider";

export const getCustomerByIdentifier = async (
  identifier: string,
): Promise<Customer> => {
  const response = await api.get<Customer>(
    `/customer/${onlyNumbers(identifier)}`,
  );
  return response.data;
};

export const postCustomer = async (
  customer: CustomerFormData,
): Promise<Customer> => {
  const response = await api.post<Customer>("/customer/add", {
    ...customer,
    identifier: onlyNumbers(customer.identifier),
    phone: onlyNumbers(customer.phone),
  });
  return response.data;
};
