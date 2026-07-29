import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/Login";
// import ResetPassword from "../pages/ResetPassword";
import CreateAccount from "../pages/CreateAccount";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Payment from "../pages/Payment";
import Shipping from "../pages/Shipping";
import Cashier from "../pages/Cashier";
import Customer from "../pages/Customer";
import NewCashier from "../pages/NewCashier";
import NewCustomer from "../pages/NewCustomer";
import NewProduct from "../pages/NewProduct";
import NewShipping from "../pages/NewShipping";
import Discount from "../pages/Discount";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/product/new"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/cashier"
          element={
            <PrivateRoute>
              <Cashier />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/cashier/new"
          element={
            <PrivateRoute>
              <NewCashier />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/customer"
          element={
            <PrivateRoute>
              <Customer />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/customer/new"
          element={
            <PrivateRoute>
              <NewCustomer />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/shipping"
          element={
            <PrivateRoute>
              <Shipping />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/shipping/new"
          element={
            <PrivateRoute>
              <NewShipping />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/discount"
          element={
            <PrivateRoute>
              <Discount />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
