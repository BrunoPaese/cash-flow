import Select from "../../components/Select";
import type { Options } from "../../components/Select/type";
import Toggle from "../../components/Toggle";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { useAuth } from "../../contexts/Auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Header, Left, Right } from "./style";
import i18n from "../../i18n";
import { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { AddButton } from "../Card/style";

export type Language = "pt" | "en" | "es";

interface HeaderControlsProps {
  breadcrumbs: { label: string; path: string }[];
}

function HeaderControls({ breadcrumbs }: HeaderControlsProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function getInitialLanguage(): Language {
    const stored = localStorage.getItem("language");
    if (!stored) return stored as Language;
    return (i18n.language.split("-")[0] as Language) || "pt";
  }

  const [language, setLanguage] = useState<Language>(() =>
    getInitialLanguage(),
  );

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setLanguage(language);
  };

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
        label: t("theme.light"),
        icon: <Sun size={18} strokeWidth={1.8} />,
      },
      {
        value: "dark",
        label: t("theme.dark"),
        icon: <Moon size={18} strokeWidth={1.8} />,
      },
    ];
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <Header>
      <Left>
        <Breadcrumb items={breadcrumbs} />
      </Left>
      <Right>
        <Select
          options={getLanguageOptions()}
          value={language}
          text={t("theme.selectTheme")}
          onChange={(value) => changeLanguage(value as Language)}
        />
        <Toggle
          value={theme}
          options={getThemeOptions()}
          text={t("theme.selectTheme")}
          onChange={toggleTheme}
        />
        <AddButton type="button" onClick={handleLogout} theme={theme}>
          <LogOut size={14} />
        </AddButton>
      </Right>
    </Header>
  );
}

export default HeaderControls;
