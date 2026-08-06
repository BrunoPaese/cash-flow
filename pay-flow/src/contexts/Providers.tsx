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
import { ProductProvider } from "./Product/ProductProvider";
import { AddressProvider } from "./Address/AddressProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CurrencyProvider>
          <CheckoutProvider>
            <AddressProvider>
              <DiscountProvider>
                <ProductListProvider>
                  <CashierProvider>
                    <CustomerProvider>
                      <PaymentProvider>
                        <ShippingProvider>
                          <ProductProvider>{children}</ProductProvider>
                        </ShippingProvider>
                      </PaymentProvider>
                    </CustomerProvider>
                  </CashierProvider>
                </ProductListProvider>
              </DiscountProvider>
            </AddressProvider>
          </CheckoutProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
