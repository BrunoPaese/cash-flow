import Button from "../Button";
import Input from "../Input";
import {
  Body,
  GridButton,
  Header,
  Page,
  RightContainer,
  StyledLink,
} from "./style";
import logoDark from "../../assets/logo_dark.png";
import logoLight from "../../assets/logo_light.png";
import Select from "../Select";
import type { Options } from "../Select/type";
import { useState } from "react";
import Toggle from "../Toggle";
import { Moon, Sun, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginschema";

type ThemeMode = "light" | "dark";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema(t)),
  });

  const currentLanguage = i18n.language.split("-")[0];

  const getLanguageOptions = (): Options[] => {
    return [
      { value: "pt", label: "Português", icon: null },
      { value: "en", label: "English", icon: null },
      { value: "es", label: "Español", icon: null },
    ];
  };

  const getThemeOptions = (): Options[] => {
    return [
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
  };

  const getSystemTheme = (): ThemeMode => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // aqui você chama sua API .NET
  };

  const [theme, setTheme] = useState<ThemeMode>(getSystemTheme);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Page theme={theme}>
        <Header>
          <Select
            theme={theme}
            options={getLanguageOptions()}
            value={currentLanguage}
            text={t("login.selectTheme")}
            onChange={(value) => {
              i18n.changeLanguage(value);
            }}
          />
          <Toggle
            value={theme}
            options={getThemeOptions()}
            text={t("login.selectTheme")}
            onChange={(value) => setTheme(value as ThemeMode)}
          />
        </Header>
        <Body>
          <img
            src={theme === "dark" ? logoDark : logoLight}
            width={300}
            height={300}
            alt={t("login.logo")}
          />
          <Input
            placeholder={t("login.email")}
            type="email"
            theme={theme}
            text={t("login.enterEmail")}
            {...register("email")}
          />
          <Input
            placeholder={t("login.password")}
            type="password"
            theme={theme}
            text={t("login.enterPassword")}
            {...register("password")}
          />
          <RightContainer theme={theme}>
            <StyledLink href="/reset-password" theme={theme}>
              {t("login.forgotPassword")}
            </StyledLink>
          </RightContainer>
          <GridButton>
            <Button icon={LogIn} text={t("login.signIn")} type="submit">
              {t("login.login")}
            </Button>
          </GridButton>
          <StyledLink href="/create-account" theme={theme}>
            {t("login.createAccount")}
          </StyledLink>
        </Body>
      </Page>
    </form>
  );
}

export default Login;
