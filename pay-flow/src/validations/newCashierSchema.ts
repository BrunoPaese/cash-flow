import type { TFunction } from "i18next";
import * as yup from "yup";

export const newCashierSchema = (t: TFunction) =>
  yup.object({
    cpf: yup
      .string()
      .required(t("cashier.cashierRequired"))
      .matches(/^\d{11}$/, t("cashier.cpfInvalid")),
    name: yup.string().required(t("cashier.nameRequired")),
    email: yup
      .string()
      .required(t("cashier.emailRequired"))
      .email(t("cashier.emailInvalid")),
    isActive: yup.boolean().required(t("cashier.isActiveRequired")),
    rating: yup
      .number()
      .required(t("cashier.ratingRequired"))
      .min(0, t("cashier.minRating"))
      .max(5, t("cashier.maxRating")),
    createdAt: yup.date().required(t("cashier.createdAtRequired")),
  });
