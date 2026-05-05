import { api } from "../../api/api";
import type { ProductFormData } from "../../components/ProductFormCard";
import type { Product } from "./ProductProvider";

export const getProductByItem = async (item: string): Promise<Product> => {
  const response = await api.get<Product>(`/product/${item}`);
  return response.data;
};

export const postProduct = async (
  product: ProductFormData,
): Promise<Product> => {
  const response = await api.post<Product>("/product/add", product);
  return response.data;
};
