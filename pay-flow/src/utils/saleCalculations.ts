import type { ProductFormData } from "../components/ProductCard";
import { INTEREST_RATE } from "../domain/constants";

export function calculateItemSubTotal(quantity: number, price: number): number {
  if (quantity <= 0 || price <= 0) return 0;
  return quantity * price;
}

export function calculateSubTotal(products: ProductFormData[] = []): number {
  return products.reduce((total, item) => total + (item.price ?? 0), 0);
}

export function calculateInterest(
  netTotal: number,
  installmentCount: number,
): number {
  if (netTotal <= 0 || installmentCount <= 1) return 0;
  return netTotal * INTEREST_RATE;
}

export function calculateNetTotal(
  products: ProductFormData[],
  freight: number | undefined,
  discount: number | undefined,
): number {
  const baseTotal =
    calculateSubTotal(products) + (freight ?? 0) - (discount ?? 0);
  return baseTotal;
}

export function calculateInstallments(
  netTotal: number,
  installmentCount: number,
): number {
  if (installmentCount <= 0) return 0;
  return netTotal / installmentCount;
}

export function calculateDiscountValue(
  netTotal?: number,
  discountPercentage?: number,
): number {
  if (!netTotal || !netTotal || !discountPercentage) return 0;
  return netTotal * (discountPercentage / 100);
}

export function calculateTotalWithDiscount(
  netTotal?: number,
  discountValue?: number | undefined,
): number {
  if (!discountValue || !netTotal) return 0;
  return netTotal - discountValue;
}
