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
// import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema(t)),
  });

  const onSubmit = (data: LoginFormData) => {
    // chamada login backend
    console.log(data);
    toast.success("Sucesso");
    navigate("/checkout");
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
            autoFocus
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label={t("login.password")}
            type="password"
            text={t("login.enterPassword")}
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
