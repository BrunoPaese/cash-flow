import { api } from "../../api/api";
import type { Address } from "../../components/CustomerFormCard";
import type { ApiResponse } from "../../types/api-response";
import { onlyNumbers } from "../../utils/onlyNumbers";
import type { Customer } from "./CustomerProvider";

export interface CustomerPayload {
  identifier: string;
  name: string;
  photoUrl?: string;
  phone: string;
  email: string;
  addresses: Address[];
}

export const getCustomerByIdentifier = async (
  identifier: string,
): Promise<Customer | null> => {
  const response = await api.get<ApiResponse<Customer>>(
    `/customer/${onlyNumbers(identifier)}`,
  );
  return response.data.data;
};

export const postCustomer = async (
  customer: CustomerPayload,
): Promise<Customer> => {
  const formData = new FormData();

  formData.append("identifier", onlyNumbers(customer.identifier));
  formData.append("name", customer.name.toUpperCase());
  formData.append("phone", onlyNumbers(customer.phone));
  formData.append("email", customer.email);

  customer.addresses.forEach((address, index) => {
    formData.append(`addresses[${index}].street`, address.street.toUpperCase());
    formData.append(`addresses[${index}].number`, String(address.number));
    formData.append(
      `addresses[${index}].complement`,
      address.complement?.toUpperCase() || "",
    );
    formData.append(
      `addresses[${index}].neighborhood`,
      address.neighborhood?.toUpperCase() || "",
    );
    formData.append(`addresses[${index}].city`, address.city.toUpperCase());
    formData.append(
      `addresses[${index}].postalCode`,
      onlyNumbers(address.postalCode),
    );
    formData.append(`addresses[${index}].uf`, address.uf.toUpperCase());
  });

  if (customer.photoUrl) formData.append("photo", customer.photoUrl);

  const response = await api.post<Customer>("/customer", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
