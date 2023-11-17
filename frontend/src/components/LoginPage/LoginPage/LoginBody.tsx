import React from "react";
import styles from "./LoginBody.module.css";
import { ButtonCTA } from "../../HomePage/ButtonCTA";
import campusbridgeLogo from "../../../assets/CampusBridge-vectorized.svg";

interface FormProps {}

export const LoginBody: React.FC<FormProps> = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={styles["form-container-box"]}>
      <div className={styles["form-container"]}>
        <img src={campusbridgeLogo} alt="agency name and logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Senha</label>
            <input type="password" id="Senha" name="Senha" required />
            {/* <label htmlFor="textarea">How Can We Help You?</label>
            <textarea
              name="textarea"
              id="textarea"
              rows={10}
              cols={50}
              required
            /> */}
          </div>
          <div className={styles["cta-login-box"]}>
            <ButtonCTA text={"Entrar"} />
            <a href="/registro">Não tem conta? Registre-se aqui</a>
          </div>
        </form>
      </div>
    </section>
  );
};
