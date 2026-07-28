import { api } from "../../api/api";
import type { ProductFormData } from "../../components/ProductFormCard";
import type { Product } from "./ProductProvider";

export const getProductByItem = async (item: string): Promise<Product> => {
  const response = await api.get<Product>(`/product/${item}`);
  return response.data;
};

export const postProduct = async (product: ProductFormData) => {
  const formData = new FormData();

  formData.append("id", product.id);
  formData.append("barCode", product.barCode);
  formData.append("description", product.description);
  formData.append("price", String(product.price));
  formData.append("stockQuantity", String(product.stockQuantity));

  if (product.image) formData.append("image", product.image);

  const response = await api.post("product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
