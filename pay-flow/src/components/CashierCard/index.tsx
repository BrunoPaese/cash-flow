import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { RatingStars } from "../RatingStars";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { Hash, Star, User } from "lucide-react";
import { calculateAverageRating } from "../../utils/rating";
import { formatEmpty } from "../../utils/formatEmpty";
import type { Cashier } from "../../contexts/Cashier/CashierProvider";
import { useCheckout } from "../../contexts/Checkout/useCheckout";

interface CashierCardProps {
  previewCashier?: Cashier;
  title?: string;
  onAdd?: () => void;
}

function CashierCard({ previewCashier, title, onAdd }: CashierCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { checkout } = useCheckout();
  const navigate = useNavigate();

  const activeCashier = previewCashier ?? checkout?.cashier;

  return (
    <Card
      title={title}
      onClick={() => navigate("/checkout/cashier")}
      onAdd={onAdd}
    >
      <RowItem theme={theme}>
        <Hash size={16} />
        <Label>{t("cashier.id")}</Label>
        <Value>{formatEmpty(activeCashier?.id)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("cashier.name")}</Label>
        <Value>{formatEmpty(activeCashier?.name)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Star size={16} />
        <Label>{t("cashier.rating")}</Label>
        <Value>
          <RatingStars value={calculateAverageRating(activeCashier?.ratings)} />
          {calculateAverageRating(activeCashier?.ratings).toFixed(1)}
          <span>({activeCashier?.ratings?.length})</span>
        </Value>
      </RowItem>
    </Card>
  );
}

export default CashierCard;
