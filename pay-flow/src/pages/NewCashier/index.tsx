import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import CashierFormCard from "../../components/CashierFormCard";

function NewCashier() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("cashier.newCashier"), path: "/checkout/cashier/new" },
        ]}
      />
      <Body>
        <CashierFormCard />
      </Body>
    </Page>
  );
}

export default NewCashier;
