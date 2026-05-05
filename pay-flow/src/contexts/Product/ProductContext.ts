import { createContext } from "react";
import type { ProductFormData } from "../../components/ProductFormCard";
import type { Product } from "./ProductProvider";

export interface ProductContextData {
  loading: boolean;
  getProduct: (item: string) => Promise<Product | undefined>;
  addProduct: (product: ProductFormData) => Promise<Product | undefined>;
  confirmProduct: (product?: Product) => void;
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);
