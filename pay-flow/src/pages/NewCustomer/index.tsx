import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import CustomerFormCard from "../../components/CustomerFormCard";

function NewCustomer() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("customer.newCustomer"), path: "/checkout/customer/new" },
        ]}
      />
      <Body>
        <CustomerFormCard />
      </Body>
    </Page>
  );
}

export default NewCustomer;
