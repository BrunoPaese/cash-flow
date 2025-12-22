import type { TFunction } from "i18next";
import * as yup from "yup";

export const loginSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),

    password: yup
      .string()
      .min(6, t("validation.passwordMin"))
      .required(t("validation.passwordRequired")),
  });
