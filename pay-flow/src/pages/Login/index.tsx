import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  Body,
  Footer,
  GridButton,
  Page,
  RightContainer,
  StyledLink,
} from "./style";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../../validations/loginSchema";
import { APP_VERSION } from "../../domain/constants";
import HeaderControls from "../../components/HeaderControls";
import { useTheme } from "../../contexts/Theme/useTheme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/useAuth";
import { loginRequest } from "../../services/auth";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { refreshUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema(t)),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginRequest(data);
    await refreshUser();
    toast.success(t("login.success"));
    navigate("/checkout", { replace: true });
  };

  return (
    <Page theme={theme}>
      <HeaderControls breadcrumbs={[{ label: t("login.login"), path: "/" }]} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <img
            src={theme === "dark" ? logoDark : logoLight}
            width={300}
            height={300}
            alt={t("login.logo")}
          />
          <Input
            label={t("login.email")}
            text={t("login.enterEmail")}
            uppercase={false}
            autoFocus
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label={t("login.password")}
            type="password"
            text={t("login.enterPassword")}
            uppercase={false}
            error={errors.password?.message}
            {...register("password")}
          />
          <RightContainer theme={theme}>
            <StyledLink to="/reset-password" theme={theme}>
              {t("login.forgotPassword")}
            </StyledLink>
          </RightContainer>
          <GridButton>
            <Button icon={LogIn} text={t("login.signIn")} type="submit">
              {t("login.login")}
            </Button>
          </GridButton>
          <StyledLink to="/create-account" theme={theme}>
            {t("login.createAccount")}
          </StyledLink>
        </Body>
      </form>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Login;
