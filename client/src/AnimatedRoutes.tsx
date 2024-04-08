import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  Home,
  LoginPage,
  RegisterPage,
  ContactUsPage,
  OpportunitiesPage,
  Vacancy,
} from "./components/index";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./GraphQL/Queries";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function transition() {
  const location = useLocation();
  const navigate = useNavigate();

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  interface QueryResult {
    loading: boolean;
    error?: Error;
    data:
      | {
          getUser: User;
        }
      | undefined;
  }

  const { loading, error, data }: QueryResult = useQuery(GET_USER);

  useEffect(() => {
    if (!loading) {
      console.log("data", data);
      if (!data?.getUser || error) {
        navigate("/login");
      }
    }
  }, [loading, data, error]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/Contato" element={<ContactUsPage />} />
        <Route path="/Oportunidades" element={<OpportunitiesPage />} />
        <Route path="/Oportunidades/teste" element={<Vacancy />} />
      </Routes>
    </AnimatePresence>
  );
}
