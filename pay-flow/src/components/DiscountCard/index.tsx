import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { ArrowDown, Check, DollarSign, Percent, Tag } from "lucide-react";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { formatEmpty, formatValueEmpty } from "../../utils/formatEmpty";
import type { Discount } from "../../contexts/Discount/DiscountProvider";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { useDiscount } from "../../contexts/Discount/useDiscount";

interface DiscountCardProps {
  previewDiscount?: Discount;
  title?: string;
  onSearch?: () => void;
  onAdd?: () => void;
}

function DiscountCard({
  previewDiscount,
  title,
  onSearch,
  onAdd,
}: DiscountCardProps) {
  const { t } = useTranslation();
  const { currency, locale } = useCurrency();
  const { theme } = useTheme();
  const { checkout } = useCheckout();
  const { discountValue, totalWithDiscount } = useDiscount();

  const activeDiscount = previewDiscount ?? checkout?.discount;
  const hasDiscount = (activeDiscount?.discountPercentage ?? 0) > 0;

  const originalTotal = checkout?.payment?.subTotal ?? 0;
  const finalTotal =
    hasDiscount && totalWithDiscount !== undefined
      ? totalWithDiscount
      : checkout?.payment?.netTotal;

  return (
    <Card title={title} onSearch={onSearch} onAdd={onAdd}>
      <RowItem theme={theme}>
        <Tag size={16} />
        <Label>{t("discount.coupon")}</Label>
        <Value>{formatEmpty(activeDiscount?.couponCode)}</Value>
      </RowItem>

      <RowItem theme={theme}>
        <Percent size={16} />
        <Label>{t("discount.discount")}</Label>
        <Value>{formatValueEmpty(activeDiscount?.discountPercentage)}%</Value>
      </RowItem>

      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("discount.originalValue")}</Label>
        <Value>{formatCurrency(originalTotal, locale, currency)}</Value>
      </RowItem>

      {hasDiscount && (
        <RowItem theme={theme}>
          <ArrowDown size={16} />
          <Label>{t("discount.economy")}</Label>
          <Value>
            {formatCurrency(discountValue, locale, currency, "minus")}
          </Value>
        </RowItem>
      )}

      <RowItem theme={theme}>
        <Check size={16} />
        <Label>{t("discount.total")}</Label>
        <Value>{formatCurrency(finalTotal, locale, currency)}</Value>
      </RowItem>
    </Card>
  );
}

export default DiscountCard;
