import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  Home,
  LoginPage,
  RegisterPage,
  ContactUsPage,
  OpportunitiesPage,
  Vacancy,
  ProfilePage,
} from "./components/index";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./GraphQL/Queries";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Transition() {
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
      // Check if user is logged in or not
      if (!data?.getUser || error) {
        if (
          location.pathname !== "/registro" &&
          location.pathname !== "/login"
        ) {
          navigate("/login");
        }
      }
    }
  }, [loading, data, error, location.pathname, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/Contato" element={<ContactUsPage />} />
        <Route path="/Oportunidades" element={<OpportunitiesPage />} />
        <Route path="/Oportunidades/:id" element={<Vacancy />} />
        <Route path="/Perfil" element={<ProfilePage />} />
      </Routes>
    </AnimatePresence>
  );
}
