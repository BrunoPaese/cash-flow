import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import {
  ArrowDown,
  Check,
  CreditCard,
  DollarSign,
  Repeat,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { PaymentMethod } from "../../domain/enum";
import { getPaymentMethodLabel } from "../../domain/mappers";
import { useCheckout } from "../../contexts/Checkout/useCheckout";

interface PaymentCardProps {
  title?: string;
  onSearch?: () => void;
  onAdd: () => void;
}

function PaymentCard({ title, onSearch, onAdd }: PaymentCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const { checkout } = useCheckout();

  return (
    <Card title={title} onSearch={onSearch} onAdd={onAdd}>
      <RowItem theme={theme}>
        <CreditCard size={16} />
        <Label>{t("payment.paymentMethod")}</Label>
        <Value>
          {getPaymentMethodLabel(checkout?.payment?.paymentMethod, t)}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("payment.value")}</Label>
        <Value>
          {formatCurrency(checkout?.payment?.subTotal, locale, currency)}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <ArrowDown size={16} />
        <Label>{t("discount.discount")}</Label>
        <Value>
          {formatCurrency(
            checkout?.discount?.discountValue,
            locale,
            currency,
            "minus",
          )}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Truck size={16} />
        <Label>{t("shipping.shipping")}</Label>
        <Value>
          {formatCurrency(
            checkout?.shipping?.freight,
            locale,
            currency,
            "plus",
          )}
        </Value>
      </RowItem>
      {checkout?.payment?.installment.interest !== undefined &&
        checkout?.payment?.installment.interest > 0 && (
          <RowItem theme={theme}>
            <TrendingUp size={16} />
            <Label>{t("payment.interest")}</Label>
            <Value>
              {formatCurrency(
                checkout?.payment?.installment.interest,
                locale,
                currency,
                "plus",
              )}
            </Value>
          </RowItem>
        )}
      <RowItem theme={theme}>
        <Check size={16} />
        <Label>{t("payment.total")}</Label>
        <Value>
          {formatCurrency(checkout?.payment?.netTotal, locale, currency)}
        </Value>
      </RowItem>
      {checkout?.payment?.paymentMethod === PaymentMethod.CREDIT && (
        <RowItem theme={theme}>
          <Repeat size={16} />
          <Label>{t("payment.installments")}</Label>
          <Value>
            {t("payment.installmentsOf", {
              count: checkout.payment.installment.count,
              value: formatCurrency(
                checkout.payment.installment.value,
                locale,
                currency,
              ),
            })}
          </Value>
        </RowItem>
      )}
    </Card>
  );
}

export default PaymentCard;
