import React from "react";
import styles from "./RegisterBody.module.css";
import { ButtonCTA } from "../../HomePage/ButtonCTA";
import campusbridgeLogo from "../../../assets/CampusBridge-vectorized.svg";

interface FormProps {}

export const RegisterBody: React.FC<FormProps> = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={styles["form-container-box"]}>
      <div className={styles["form-container"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src={campusbridgeLogo} alt="agency name and logo" />

          <div className={styles["form-group"]}>
            <label htmlFor="nome">Seu Nome</label>
            <input type="text" id="nome" name="nome" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Senha</label>
            <input type="password" id="Senha" name="Senha" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Seu Curso</label>
            <input type="text" id="curso" name="curso" required />
          </div>
          <ButtonCTA text={"Registrar-se"} />
        </form>
      </div>
    </section>
  );
};
