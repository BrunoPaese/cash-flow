import type { TFunction } from "i18next";
import * as yup from "yup";

export const newCustomerSchema = (t: TFunction) =>
  yup.object({
    identifier: yup
      .string()
      .required(t("customer.identifierRequired"))
      .test("cpf-cnpj", t("customer.identifierInvalid"), (value) => {
        if (!value) return false;
        const digits = value.replace(/\D/g, "");
        return digits.length === 11 || digits.length === 14;
      }),
    name: yup.string().required(t("customer.nameRequired")),
    phone: yup
      .string()
      .required(t("customer.phoneRequired"))
      .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, t("customer.phoneInvalid")),
    email: yup
      .string()
      .required(t("customer.emailRequired"))
      .email(t("customer.emailInvalid")),
    address: yup
      .array()
      .of(
        yup.object({
          street: yup.string().required(t("address.streetRequired")),
          number: yup.string().optional(),
          complement: yup.string().optional(),
          neighborhood: yup.string().optional(),
          city: yup.string().required(t("address.cityRequired")),
          postalCode: yup
            .string()
            .required(t("address.postalCodeRequired"))
            .matches(/^\d{5}-\d{3}$/, t("address.postalCodeInvalid")),
          country: yup.string().optional(),
          uf: yup
            .string()
            .required(t("address.ufRequired"))
            .matches(/^[A-Z]{2}$/, t("address.ufInvalid")),
        }),
      )
      .min(1, t("address.addressRequired"))
      .required(),
  });
