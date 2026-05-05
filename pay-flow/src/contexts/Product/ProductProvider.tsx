import { useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";
import type { ProductFormData } from "../../components/ProductFormCard";
import { getProductByItem, postProduct } from "./product.service";
import { ProductContext } from "./ProductContext";

export interface Product {
  item: string;
  description: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  barCode: string;
  isActive: boolean;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const getProduct = async (item: string): Promise<Product | undefined> => {
    try {
      const product = await getProductByItem(item);
      return product;
    } catch {
      toast.error(t("product.errorGetProduct"));
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (
    product: ProductFormData,
  ): Promise<Product | undefined> => {
    setLoading(true);
    try {
      const newCustomer = await postProduct(product);
      return newCustomer;
    } catch {
      toast.error(t("product.errorAddProduct"));
    } finally {
      setLoading(false);
    }
  };

  const confirmProduct = async (product?: Product) => {
    setCheckout((prev) => ({
      ...prev,
      product,
    }));
    toast.success(t("product.submitProduct"));
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        getProduct,
        addProduct,
        confirmProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
