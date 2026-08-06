import { createContext } from "react";
import type { PostalCode } from "./AddressProvider";

export interface AddressContextData {
  loading: boolean;
  getAddress: (postalCode: string) => Promise<PostalCode | undefined>;
}

export const AddressContext = createContext<AddressContextData>(
  {} as AddressContextData,
);
