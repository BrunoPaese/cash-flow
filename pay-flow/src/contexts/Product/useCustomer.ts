import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export function useProduct() {
  return useContext(ProductContext);
}
