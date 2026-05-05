import type { TFunction } from "i18next";
import * as yup from "yup";

export const newShippingSchema = (t: TFunction) =>
  yup.object({
    type: yup.number().required(t("shipping.typeRequired")),
    name: yup.string().required(t("shipping.nameRequired")),
  });
