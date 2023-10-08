import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "./components/HomePage/Home";

export default function transition() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/aboutUs" element={<AboutUs_Page />} /> */}
        <Route index element={<Home/>} />
      </Routes>
    </AnimatePresence>
  );
}
