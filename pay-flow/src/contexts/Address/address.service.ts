import { api } from "../../api/api";
import type { ApiResponse } from "../../types/api-response";
import type { PostalCode } from "./AddressProvider";

export const getAddressByPostalCode = async (
  postalCode: string,
): Promise<PostalCode | null> => {
  const response = await api.post<ApiResponse<PostalCode>>(
    `/address/postal-code`,
    {
      postalCode,
    },
  );
  return response.data.data;
};
