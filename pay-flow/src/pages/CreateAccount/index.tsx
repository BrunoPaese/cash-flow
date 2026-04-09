import { useTranslation } from "react-i18next";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { useTheme } from "../../contexts/Theme/useTheme";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccountSchema } from "../../validations/createAccountSchema";
import { GridButton, Title } from "../Shipping/style";
import { useState } from "react";
import Button from "../../components/Button";
import { ArrowLeft, Mail, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { VerificationCode } from "../../components/VerificationCode";

type CreateAccountStep = "email" | "create";

interface LoginFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

function CreateAccount() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [step, setStep] = useState<CreateAccountStep>("email");
  const [code, setCode] = useState("");

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(createAccountSchema(t)),
    mode: "onTouched",
  });

  const goToNextStep = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;
    // API envio do código
    toast.success(t("resetPassword.sentEmail"));
    setStep("create");
  };

  const handleResetPassword = async () => {
    const isValid = await trigger(["code", "password", "confirmPassword"]);
    if (!isValid) return;
    console.log(code);
    // API validar código
    // API criar conta
    toast.success(t("resetPassword.passwordChanged"));
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("login.login"), path: "/" },
          { label: t("login.createAccount"), path: "/create-account" },
        ]}
      />
      <Body>
        <Title theme={theme}>
          {step === "email"
            ? t("createAccount.titleEmail")
            : t("createAccount.titleCreate")}
        </Title>
        {step === "email" && (
          <>
            <Input
              placeholder={t("login.name")}
              error={errors.name?.message}
              text={t("login.name")}
              {...register("name")}
            />
            <Input
              placeholder={t("login.email")}
              error={errors.email?.message}
              text={t("login.enterEmail")}
              {...register("email")}
            />
            <Button
              icon={Mail}
              text={t("resetPassword.sendCode")}
              onClick={goToNextStep}
            >
              {t("resetPassword.sendCode")}
            </Button>
          </>
        )}
        {step === "create" && (
          <>
            <VerificationCode
              label={t("createAccount.verificationCode")}
              onComplete={(value) => setCode(value)}
              error={errors.code?.message}
              {...register("code")}
            />
            <Input
              type="password"
              text={t("login.enterEmail")}
              placeholder={t("login.password")}
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              type="password"
              placeholder={t("resetPassword.confirmPassword")}
              text={t("login.confirmPassword")}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <GridButton>
              <Button
                icon={ArrowLeft}
                text={t("common.back")}
                onClick={() => setStep("email")}
              >
                {t("common.back")}
              </Button>
              <Button
                icon={UserPlus}
                text={t("createAccount.createAccount")}
                onClick={handleResetPassword}
              >
                {t("createAccount.createAccount")}
              </Button>
            </GridButton>
          </>
        )}
      </Body>
    </Page>
  );
}

export default CreateAccount;
