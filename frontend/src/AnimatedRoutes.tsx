import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "./components/HomePage/Home";
import { LoginPage } from "./components/LoginPage/LoginPage/LoginPage";
import { RegisterPage } from "./components/LoginPage/RegisterPage/RegisterPage";

export default function transition() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </AnimatePresence>
  );
}
