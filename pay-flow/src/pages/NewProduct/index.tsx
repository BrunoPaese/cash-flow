import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import ProductFormCard from "../../components/ProductFormCard";

function NewProduct() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("product.newProduct"), path: "/checkout/product/new" },
        ]}
      />
      <Body>
        <ProductFormCard />
      </Body>
    </Page>
  );
}

export default NewProduct;
