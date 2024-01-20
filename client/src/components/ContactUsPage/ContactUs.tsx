import styles from "./ContactUs.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Form from "./Form";
import Info from "./Info";
import { HeaderSubPage } from "../utils/HeaderSubPage";

export const ContactUs = () => {
  return (
    <section className={styles["section-container"]}>
      <HeaderSubPage item={"Contato"} />
      <div className={styles["contactus-grid"]}>
        <h2>Entre em contato conosco</h2>
        <p className="description-section-title">
          Faça parte da mudança que você deseja ver no mundo. Encontre seu
          projeto de voluntariado ideal agora
        </p>
      </div>
      <div className={styles["form-info-container"]}>
        <Info />
        <Form />
      </div>
    </section>
  );
};
