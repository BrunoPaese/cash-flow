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

type ThemeMode = "light" | "dark";

function Login() {
  const getLanguageOptions = (): Options[] => {
    return [
      { value: "pt", label: "Português", icon: null },
      { value: "en", label: "Inglês", icon: null },
      { value: "es", label: "Espanhol", icon: null },
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

  const [theme, setTheme] = useState<ThemeMode>(getSystemTheme);

  return (
    <Page theme={theme}>
      <Header>
        <Select theme={theme} options={getLanguageOptions()} />
        <Toggle
          value={theme}
          options={getThemeOptions()}
          onChange={(value) => setTheme(value as ThemeMode)}
        />
      </Header>
      <Body>
        <img
          src={theme === "dark" ? logoDark : logoLight}
          width={300}
          height={300}
          alt="Logo do sistema"
        />
        <Input label="Email" type="email" theme={theme} />
        <Input label="Password" type="password" theme={theme} />
        <RightContainer theme={theme}>
          <StyledLink href="/reset-password" theme={theme}>
            Forgot Password?
          </StyledLink>
        </RightContainer>
        <GridButton>
          <Button icon={LogIn}>Login</Button>
        </GridButton>
        <StyledLink href="/create-account" theme={theme}>
          Create Account
        </StyledLink>
      </Body>
    </Page>
  );
}

export default Login;
