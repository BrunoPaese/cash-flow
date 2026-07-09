import type { TFunction } from "i18next";
import * as yup from "yup";

export const newProductSchema = (t: TFunction) =>
  yup.object({
    id: yup.string().required(t("product.idRequired")),
    barCode: yup.string().required(t("product.barCodeRequired")),
    description: yup.string().required(t("product.descriptionRequired")),
    price: yup
      .number()
      .required(t("product.priceRequired"))
      .min(0, t("product.minPrice")),
    stockQuantity: yup
      .number()
      .required(t("product.stockRequired"))
      .min(1, t("product.minQuantity")),
  });
