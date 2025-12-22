import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
