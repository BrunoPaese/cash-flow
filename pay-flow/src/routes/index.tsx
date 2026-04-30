import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ResetPassword from "../pages/Shipping";
import CreateAccount from "../pages/CreateAccount";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Payment from "../pages/Payment";
import Shipping from "../pages/Shipping";
import Cashier from "../pages/Cashier";
import Customer from "../pages/Customer";
import Discount from "../pages/Discount";
import NewCashier from "../pages/NewCashier";
import NewCustomer from "../pages/NewCustomer";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/product" element={<Product />} />
        <Route path="/checkout/cashier" element={<Cashier />} />
        <Route path="/checkout/cashier/new" element={<NewCashier />} />
        <Route path="/checkout/customer" element={<Customer />} />
        <Route path="/checkout/customer/new" element={<NewCustomer />} />
        <Route path="/checkout/shipping" element={<Shipping />} />
        <Route path="/checkout/discount" element={<Discount />} />
        <Route path="/checkout/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
