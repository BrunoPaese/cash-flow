import Input from "../../components/Input";
import Select from "../../components/Select";
import type { Options } from "../../components/Select/type";
import { useState } from "react";
import Toggle from "../../components/Toggle";
import { Moon, Sun, KeyRound, ArrowLeft, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { APP_VERSION } from "../../config/app";
import { Body, Footer, Header, Page } from "../Login/style";
import Button from "../../components/Button";
import { VerificationCode } from "../../components/VerificationCode";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import { GridButton } from "./style";

type ThemeMode = "light" | "dark";
type ResetPasswordStep = "email" | "reset";

interface ResetPasswordFormData {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const { t } = useTranslation();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema(t)),
    mode: "onTouched",
  });

  const currentLanguage = i18n.language.split("-")[0];

  const [theme, setTheme] = useState<ThemeMode>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const [step, setStep] = useState<ResetPasswordStep>("email");
  const [code, setCode] = useState("");

  const getLanguageOptions = (): Options[] => [
    { value: "pt", label: "Português", icon: null },
    { value: "en", label: "English", icon: null },
    { value: "es", label: "Español", icon: null },
  ];

  const getThemeOptions = (): Options[] => [
    {
      value: "light",
      label: "Claro",
      icon: <Sun size={18} strokeWidth={1.8} />,
    },
    {
      value: "dark",
      label: "Escuro",
      icon: <Moon size={18} strokeWidth={1.8} />,
    },
  ];

  const goToNextStep = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;
    // API envio do código
    toast.success(t("resetPassword.sentEmail"));
    setStep("reset");
  };

  const handleResetPassword = async () => {
    const isValid = await trigger(["code", "password", "confirmPassword"]);
    if (!isValid) return;
    console.log(code);
    // API validar código
    // API redefinir senha
    toast.success(t("resetPassword.passwordChanged"));
  };

  return (
    <Page theme={theme}>
      <Header>
        <Select
          theme={theme}
          options={getLanguageOptions()}
          value={currentLanguage}
          text={t("login.selectLanguage")}
          onChange={(value) => i18n.changeLanguage(value)}
        />
        <Toggle
          value={theme}
          options={getThemeOptions()}
          text={t("login.selectTheme")}
          onChange={(value) => setTheme(value as ThemeMode)}
        />
      </Header>
      <Body>
        {step === "email" && (
          <>
            <Input
              placeholder={t("login.email")}
              theme={theme}
              error={errors.email?.message}
              {...register("email")}
            />
            <Button
              type="button"
              icon={Mail}
              text={t("common.back")}
              onClick={goToNextStep}
            >
              {t("resetPassword.sendCode")}
            </Button>
          </>
        )}
        {step === "reset" && (
          <>
            <VerificationCode
              theme={theme}
              onComplete={(value) => setCode(value)}
              error={errors.code?.message}
              {...register("code")}
            />
            <Input
              placeholder={t("login.password")}
              theme={theme}
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              placeholder={t("resetPassword.confirmPassword")}
              theme={theme}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <GridButton>
              <Button
                type="button"
                icon={ArrowLeft}
                text={t("common.back")}
                onClick={() => setStep("email")}
              >
                {t("common.back")}
              </Button>
              <Button
                type="button"
                icon={KeyRound}
                text={t("common.back")}
                onClick={handleResetPassword}
              >
                {t("resetPassword.changePassword")}
              </Button>
            </GridButton>
          </>
        )}
        <Footer theme={theme}>
          {t("app.version")} v{APP_VERSION}
        </Footer>
      </Body>
    </Page>
  );
}

export default ResetPassword;
