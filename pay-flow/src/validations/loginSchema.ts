import type { TFunction } from "i18next";
import * as yup from "yup";

export const loginSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .lowercase()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),

    password: yup
      .string()
      .min(12, t("validation.passwordMin"))
      .matches(/^\S+$/, t("validation.passwordNoSpaces"))
      .required(t("validation.passwordRequired")),
  });
