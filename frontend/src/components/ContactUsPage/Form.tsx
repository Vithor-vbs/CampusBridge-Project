import React, { useState } from 'react';
import { ButtonCTA } from '../HomePage/ButtonCTA';
import styles from "./Form.module.css";
import campusbridgeLogo from "/src/assets/CampusBridge-vectorized.svg";


interface Form {}

export const Form: React.FC<Form> = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={styles["form-container-box"]}>
      <div className={styles["form-container"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="nome">Seu Nome</label>
            <input type="text" id="nome" name="nome" placeholder='ABC' required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder='ABC@def.com' required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Titulo</label>
            <input type="text" id="Titulo" name="Titulo" placeholder='opcional' />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Mensagem</label>
            <textarea id="Mensagem" name="Mensagem" placeholder='Olá, gostaria de entender um pouco mais sobre ...' required />
            </div>
          <ButtonCTA text={"Enviar"} />
        </form>
      </div>
    </section>
  );
};

export default Form;