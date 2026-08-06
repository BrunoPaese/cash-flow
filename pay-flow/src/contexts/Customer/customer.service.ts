import { api } from "../../api/api";
import type { CustomerFormData } from "../../components/CustomerFormCard";
import type { ApiResponse } from "../../types/api-response";
import { onlyNumbers } from "../../utils/onlyNumbers";
import type { Customer } from "./CustomerProvider";

export const getCustomerByIdentifier = async (
  identifier: string,
): Promise<Customer | null> => {
  const response = await api.get<ApiResponse<Customer>>(
    `/customer/${onlyNumbers(identifier)}`,
  );
  return response.data.data;
};

export const postCustomer = async (
  customer: CustomerFormData,
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

  if (customer.photo) formData.append("photo", customer.photo);

  const response = await api.post<Customer>("/customer", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
