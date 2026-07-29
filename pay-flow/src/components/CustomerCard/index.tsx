import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { CreditCard, Mail, Phone, User } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { formatPhoneInternational } from "../../utils/phone";
import { formatEmpty } from "../../utils/formatEmpty";
import type { Customer } from "../../contexts/Customer/CustomerProvider";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { maskCpfCnpj } from "../../utils/mask";
import type { CountryCode } from "libphonenumber-js";

interface CustomerCardProps {
  previewCustomer?: Customer;
  title?: string;
  onSearch?: () => void;
  onAdd?: () => void;
}

function CustomerCard({
  previewCustomer,
  title,
  onSearch,
  onAdd,
}: CustomerCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { checkout } = useCheckout();

  const activeCustumer = previewCustomer ?? checkout?.customer;

  return (
    <Card title={title} onSearch={onSearch} onAdd={onAdd}>
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("customer.name")}</Label>
        <Value>{formatEmpty(activeCustumer?.name)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <CreditCard size={16} />
        <Label>{t("customer.identifier")}</Label>
        <Value>{maskCpfCnpj(activeCustumer?.identifier, "–")}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Phone size={16} />
        <Label>{t("customer.phone")}</Label>
        <Value>
          {formatPhoneInternational(
            activeCustumer?.phone,
            activeCustumer?.country as CountryCode,
            "–",
          )}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Mail size={16} />
        <Label>{t("customer.email")}</Label>
        <Value>{formatEmpty(activeCustumer?.email)}</Value>
      </RowItem>
    </Card>
  );
}

export default CustomerCard;
