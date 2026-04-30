import { useTheme } from "../../contexts/Theme/useTheme";
import { Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { Body } from "./style";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import ProductCard from "../../components/ProductCard";
import ProductListCard from "../../components/ProductListCard";
import DiscountCard from "../../components/DiscountCard";
import CashierCard from "../../components/CashierCard";
import CustomerCard from "../../components/CustomerCard";
import PaymentCard from "../../components/PaymentCard";
import ShippingCard from "../../components/ShippingCard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[{ label: t("checkout.checkout"), path: "/checkout" }]}
      />
      <Body>
        <Row>
          <Col lg={9}>
            <Row>
              <ProductCard onAdd={() => navigate("/checkout/product/new")} />
            </Row>
            <Row>
              <ProductListCard />
            </Row>
          </Col>
          <Col lg={3}>
            <Row>
              <CashierCard
                title={t("cashier.cashier")}
                onAdd={() => navigate("/checkout/cashier/new")}
              />
            </Row>
            <Row>
              <CustomerCard
                title={t("customer.customer")}
                onAdd={() => navigate("/checkout/customer/new")}
              />
            </Row>
            <Row>
              <ShippingCard
                title={t("shipping.shipping")}
                onAdd={() => navigate("/checkout/shipping/new")}
              />
            </Row>
            <Row>
              <DiscountCard
                title={t("discount.discount")}
                onAdd={() => navigate("/checkout/discount/new")}
              />
            </Row>
            <Row>
              <PaymentCard
                title={t("payment.payment")}
                onAdd={() => navigate("/checkout/payment/new")}
              />
            </Row>
          </Col>
        </Row>
      </Body>
      ''
    </Page>
  );
}

export default Checkout;
