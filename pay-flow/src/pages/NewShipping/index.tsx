import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import ShippingFormCard from "../../components/ShippingFormCard";

function NewShipping() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("shipping.newShipping"), path: "/checkout/shipping/new" },
        ]}
      />
      <Body>
        <ShippingFormCard />
      </Body>
    </Page>
  );
}

export default NewShipping;
