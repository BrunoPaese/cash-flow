import type { TFunction } from "i18next";
import * as yup from "yup";

export const newProductSchema = (t: TFunction) =>
  yup.object({
    item: yup.string().required(t("product.productRequired")),
    description: yup.string().required(t("product.descriptionRequired")),
    price: yup
      .number()
      .required(t("product.priceRequired"))
      .min(0, t("product.minPrice")),
    costPrice: yup
      .number()
      .required(t("product.costPriceRequired"))
      .min(0, t("product.minCostPrice")),
    stock: yup
      .number()
      .required(t("product.stockRequired"))
      .min(1, t("product.minQuantity")),
    minStock: yup
      .number()
      .required(t("product.minStockRequired"))
      .min(0, t("product.minStock")),
    maxStock: yup
      .number()
      .required(t("product.maxStockRequired"))
      .min(yup.ref("minStock"), t("product.maxStockMustBeGreaterThanMinStock")),
    barCode: yup.string().required(t("product.barCodeRequired")),
    isActive: yup.boolean().required(t("product.isActiveRequired")),
  });
