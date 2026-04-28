import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { Calendar, DollarSign, MapPin, Package } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { formatEmpty } from "../../utils/formatEmpty";
import type { Shipping } from "../../contexts/Shipping/ShippingProvider";
import { useCheckout } from "../../contexts/Checkout/useCheckout";

interface ShippingCardProps {
  previewShipping?: Shipping;
  title?: string;
  onAdd?: () => void;
}

function ShippingCard({ previewShipping, title, onAdd }: ShippingCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const { checkout } = useCheckout();
  const navigate = useNavigate();

  const activeShipping = previewShipping ?? checkout?.shipping;

  return (
    <Card
      title={title}
      onClick={() => navigate("/checkout/shipping")}
      onAdd={onAdd}
    >
      <RowItem theme={theme}>
        <Package size={16} />
        <Label>{t("shipping.type")}</Label>
        <Value>{formatEmpty(activeShipping?.type)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Calendar size={16} />
        <Label>{t("shipping.deliveryTime")}</Label>
        <Value>{formatEmpty(activeShipping?.deliveryTime)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("shipping.cost")}</Label>
        <Value>
          {formatCurrency(
            activeShipping?.freight ?? 0,
            locale,
            currency,
            "plus",
          )}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <MapPin size={16} />
        <Label>{t("shipping.address")}</Label>
        <Value>{formatEmpty(checkout?.customer?.adress)}</Value>
      </RowItem>
    </Card>
  );
}

export default ShippingCard;
