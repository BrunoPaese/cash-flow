import { useContext } from "react";
import { AddressContext } from "./AddressContext";

export function useAddress() {
  return useContext(AddressContext);
}
