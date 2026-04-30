import { useState, type ReactNode } from "react";
import type { Cashier } from "../Cashier/CashierContext";
import type { Customer } from "../Customer/CustomerProvider";
import type { Shipping } from "../Shipping/ShippingProvider";
import type { Discount } from "../Discount/DiscountProvider";
import { CheckoutContext } from "./CheckoutContext";
import type { Payment } from "../Payment/PaymentProvider";

export interface Checkout {
  cashier?: Cashier;
  customer?: Customer;
  shipping?: Shipping;
  discount?: Discount;
  payment?: Payment;
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [checkout, setCheckout] = useState<Checkout>({});

  return (
    <CheckoutContext.Provider
      value={{
        checkout,
        setCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
