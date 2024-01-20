import React, { useEffect, useState } from "react";
import styles from "./LoginBody.module.css";
import { ButtonCTA } from "../../HomePage/ButtonCTA";
import campusbridgeLogo from "../../../assets/CampusBridge-vectorized.svg";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../GraphQL/Mutations";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../GraphQL/Queries";

interface FormProps {}

export const LoginBody: React.FC<FormProps> = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const { loading, error, data } = useQuery(GET_USER);
  useEffect(() => {
    if (!loading) {
      console.log(data);
      if (data.getUser !== null && !error) {
        window.location.href = "/login";
      }
    }
  }, []);

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data) {
        window.location.href = "/";
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const loginUser = () => {
    login({
      variables: {
        email: email,
        password: pwd,
      },
    });
  };

  return (
    <section className={styles["form-container-box"]}>
      <div className={styles["form-container"]}>
        <img src={campusbridgeLogo} alt="agency name and logo" />
        <form className={styles.form}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Senha</label>
            <input
              type="password"
              id="Senha"
              name="Senha"
              required
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </div>
          <div className={styles["cta-login-box"]}>
            <ButtonCTA text={"Entrar"} action={loginUser} />
            <a href="/registro">Não tem conta? Registre-se aqui</a>
          </div>
        </form>
      </div>
    </section>
  );
};
