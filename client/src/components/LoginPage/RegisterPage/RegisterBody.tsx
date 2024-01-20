import React, { useState } from "react";
import styles from "./RegisterBody.module.css";
import { ButtonCTA } from "../../HomePage/ButtonCTA";
import campusbridgeLogo from "../../../assets/CampusBridge-vectorized.svg";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../GraphQL/Mutations";

interface FormProps {}

export const RegisterBody: React.FC<FormProps> = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      if (data) {
        window.location.href = "/login";
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const registerUser = () => {
    signUp({
      variables: {
        email: email,
        password: pwd,
        firstName: firstname,
        lastName: lastname,
      },
    });
  };

  return (
    <section className={styles["form-container-box"]}>
      <div className={styles["form-container"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src={campusbridgeLogo} alt="agency name and logo" />

          <div className={styles["form-group"]}>
            <label htmlFor="nome">Primeiro Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="lastname">Último nome</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
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
            <label htmlFor="password">Senha</label>
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
          <ButtonCTA text={"Registrar-se"} action={registerUser} />
        </form>
      </div>
    </section>
  );
};
