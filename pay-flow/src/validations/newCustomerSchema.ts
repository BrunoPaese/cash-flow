import type { TFunction } from "i18next";
import * as yup from "yup";

export const newCustomerSchema = (t: TFunction) =>
  yup.object({
    identifier: yup.string().required(t("customer.identifierRequired")),
    name: yup.string().required(t("customer.nameRequired")),
    phone: yup
      .string()
      .required(t("customer.phoneRequired"))
      .matches(/^\d{10,11}$/, t("customer.phoneInvalid")),
    email: yup
      .string()
      .required(t("customer.emailRequired"))
      .email(t("customer.emailInvalid")),
    address: yup.object({
      street: yup.string().required(t("address.streetRequired")),
      city: yup.string().required(t("address.cityRequired")),
      postalCode: yup
        .string()
        .required(t("address.postalCodeRequired"))
        .matches(/^\d{8}$/, t("address.postalCodeInvalid")),
      state: yup.string().required(t("address.stateRequired")),
      uf: yup
        .string()
        .required(t("address.ufRequired"))
        .length(2, t("address.ufInvalid")),
      country: yup.string().required(t("address.countryRequired")),
    }),
  });
