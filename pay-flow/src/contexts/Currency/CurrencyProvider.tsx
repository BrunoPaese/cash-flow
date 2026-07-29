import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CurrencyContext } from "./CurrencyContext";
import { currencyByLocale } from "./currency.config";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const locale = i18n.language;

  const defaultCurrency =
    currencyByLocale[locale as keyof typeof currencyByLocale] ?? "USD";

  const [currency, setCurrency] = useState(defaultCurrency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        locale,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
