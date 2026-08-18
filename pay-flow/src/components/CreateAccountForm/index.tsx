import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { ActionFooter } from "../ActionFooter";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccountSchema } from "../../validations/createAccountSchema";
import { VerificationCode } from "../VerificationCode";
import { useLoading } from "../../hooks/useLoading";
import { useAuth } from "../../contexts/Auth/useAuth";
import i18n from "../../i18n";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export interface CreateAccountFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

function CustomerFormCard() {
  const { t } = useTranslation();
  const { execute } = useLoading();
  const { registerAccount, verifyEmail } = useAuth();

  const navigate = useNavigate();

  const [codeSent, setCodeSent] = useState<boolean>(false);

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: yupResolver(createAccountSchema(t, codeSent)),
    mode: "onTouched",
  });

  const handleClear = () => {
    reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    });
    setCodeSent(false);
  };

  const onSubmit = async (data: CreateAccountFormData) => {
    if (!codeSent) {
      try {
        await execute(() =>
          registerAccount({
            name: data.name,
            email: data.email,
            passwordHash: data.password,
            language: i18n.language,
          }),
        );
        toast.success(t("createAccount.sentEmail"));
        setCodeSent(true);
      } catch (error) {
        const isEmailConflict =
          error instanceof AxiosError && error.response?.status === 409;
        if (isEmailConflict) {
          toast.error(t("createAccount.emailAlreadyExists"));
          return;
        }
        toast.error(t("createAccount.sendCodeError"));
      }
      return;
    }

    try {
      await execute(() => verifyEmail({ email: data.email, code: data.code }));
      toast.success(t("createAccount.accountCreated"));
      navigate("/login", { replace: true });
    } catch {
      toast.error(t("createAccount.invalidCode"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Row>
            <Col xs={12}>
              <Card title={t("createAccount.titleCreate")}>
                <Row>
                  <Col>
                    <Input
                      text=""
                      label={t("login.name")}
                      placeholder={t("login.placeholderName")}
                      error={errors.name?.message}
                      disabled={codeSent}
                      {...register("name")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      text=""
                      label={t("login.email")}
                      placeholder={t("login.enterEmail")}
                      uppercase={false}
                      error={errors.email?.message}
                      disabled={codeSent}
                      {...register("email")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Input
                      text=""
                      type="password"
                      label={t("login.password")}
                      placeholder={t("login.enterPassword")}
                      uppercase={false}
                      error={errors.password?.message}
                      disabled={codeSent}
                      {...register("password")}
                    />
                  </Col>
                  <Col xs={6}>
                    <Input
                      text=""
                      type="password"
                      label={t("resetPassword.confirmPassword")}
                      placeholder={t("login.confirmPassword")}
                      uppercase={false}
                      error={errors.confirmPassword?.message}
                      disabled={codeSent}
                      {...register("confirmPassword")}
                    />
                  </Col>
                </Row>
                {codeSent && (
                  <Row>
                    <Col>
                      <VerificationCode
                        label={t("createAccount.verificationCode")}
                        onComplete={(value) =>
                          setValue("code", value, { shouldValidate: true })
                        }
                        error={errors.code?.message}
                      />
                    </Col>
                  </Row>
                )}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionFooter
                confirmText={
                  codeSent
                    ? t("createAccount.createAccount")
                    : t("resetPassword.sendCode")
                }
                onClear={handleClear}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
}

export default CustomerFormCard;
