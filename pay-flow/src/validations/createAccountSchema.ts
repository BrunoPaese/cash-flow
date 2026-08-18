import type { TFunction } from "i18next";
import * as yup from "yup";

export const createAccountSchema = (t: TFunction, codeSent: boolean) =>
  yup.object({
    name: yup.string().trim().uppercase().required(t("login.nameRequired")),

    email: yup
      .string()
      .trim()
      .lowercase()
      .email(t("login.emailInvalid"))
      .required(t("login.emailRequired")),

    password: yup
      .string()
      .min(12, t("login.passwordMin"))
      .matches(/^\S+$/, t("login.passwordNoSpaces"))
      .required(t("login.passwordRequired")),

    confirmPassword: yup
      .string()
      .min(12, t("login.passwordMin"))
      .matches(/^\S+$/, t("login.passwordNoSpaces"))
      .oneOf([yup.ref("password")], t("login.passwordsMustMatch"))
      .required(t("login.passwordRequired")),

    code: yup
      .string()
      .default("")
      .test("code-required", t("login.codeRequired"), (value) =>
        codeSent ? !!value : true,
      ),
  });
