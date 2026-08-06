import { api } from "../../api/api";
import type { ProductFormData } from "../../components/ProductFormCard";
import type { ApiResponse } from "../../types/api-response";
import type { Product } from "./ProductProvider";

export const getProductByItem = async (
  item: string,
): Promise<Product | null> => {
  const response = await api.get<ApiResponse<Product>>(`/product/${item}`);
  return response.data.data;
};

export const postProduct = async (product: ProductFormData) => {
  const formData = new FormData();

  formData.append("id", product.id);
  formData.append("barCode", product.barCode);
  formData.append("description", product.description);
  formData.append("price", String(product.price));
  formData.append("stockQuantity", String(product.stockQuantity));

  if (product.image) formData.append("image", product.image);

  const response = await api.post("product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
