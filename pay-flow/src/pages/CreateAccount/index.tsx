import { useTranslation } from "react-i18next";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { useTheme } from "../../contexts/Theme/useTheme";
import CreateAccountForm from "../../components/CreateAccountForm";

function CreateAccount() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("login.login"), path: "/" },
          { label: t("login.createAccount"), path: "/create-account" },
        ]}
      />
      <Body>
        <CreateAccountForm />
      </Body>
    </Page>
  );
}

export default CreateAccount;
