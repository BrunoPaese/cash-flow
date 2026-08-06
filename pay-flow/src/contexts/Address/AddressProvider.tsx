import { useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AddressContext } from "./AddressContext";
import { getAddressByPostalCode } from "./address.service";

export interface PostalCode {
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export function AddressProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const getAddress = async (
    postalCode: string,
  ): Promise<PostalCode | undefined> => {
    try {
      const address = await getAddressByPostalCode(postalCode);
      return address;
    } catch {
      toast.error(t("address.errorGetAddress"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        loading,
        getAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
