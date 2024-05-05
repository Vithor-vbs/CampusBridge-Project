import { useMutation } from "@apollo/client";
import { ButtonCTA } from "../HomePage/ButtonCTA";
import styles from "./Form.module.css";
import { ADD_FEEDBACK } from "../../GraphQL/Mutations";
import { useState } from "react";
// import campusbridgeLogo from "/src/assets/CampusBridge-vectorized.svg";

interface Form {}

export const Form: React.FC<Form> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendFeedback();
  };

  const [addFeedback] = useMutation(ADD_FEEDBACK, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const sendFeedback = () => {
    addFeedback({
      variables: {
        name: name,
        email: email,
        title: title,
        message: message,
      },
    });
  };

  return (
    <section className={styles["form-container-box"]}>
      <div className={styles["form-container"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="nome">Seu Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="ABC"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="ABC@def.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Titulo</label>
            <input
              type="text"
              id="Titulo"
              name="Titulo"
              placeholder="opcional"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Mensagem</label>
            <textarea
              id="Mensagem"
              name="Mensagem"
              placeholder="Olá, gostaria de entender um pouco mais sobre ..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
            />
          </div>
          <ButtonCTA action={sendFeedback} text={"Enviar"} />
        </form>
      </div>
    </section>
  );
};

export default Form;
