import type { ReactNode } from "react";

import { CheckoutProvider } from "./Checkout/CheckoutProvider";
import { ProductListProvider } from "./ProductList/ProductListProvider";
import { PaymentProvider } from "./Payment/PaymentProvider";
import { DiscountProvider } from "./Discount/DiscountProvider";
import { ShippingProvider } from "./Shipping/ShippingProvider";
import { CurrencyProvider } from "./Currency/CurrencyProvider";
import { ThemeProvider } from "./Theme/ThemeProvider";
import { CashierProvider } from "./Cashier/CashierProvider";
import { CustomerProvider } from "./Customer/CustomerProvider";
import { AuthProvider } from "./Auth/AuthProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CurrencyProvider>
          <CheckoutProvider>
            <DiscountProvider>
              <ProductListProvider>
                <CashierProvider>
                  <CustomerProvider>
                    <PaymentProvider>
                      <ShippingProvider>{children}</ShippingProvider>
                    </PaymentProvider>
                  </CustomerProvider>
                </CashierProvider>
              </ProductListProvider>
            </DiscountProvider>
          </CheckoutProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
