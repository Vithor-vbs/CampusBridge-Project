import styles from "./ContactUs.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Form from "./Form";
import Info from "./Info";

export const ContactUs = () => {
  return (
    
    <section className={styles["section-container"]}>
      <div className={styles["header-container"]}>
        <div className={styles["header-flex"]}>
          <h2>Contato</h2>
          <p>
            <span className={styles.bold}>Home</span>
            <IoIosArrowForward size="12px" />
            <span>Contato</span>
          </p>
        </div>
      </div>
      <div className={styles["contactus-grid"]}>
        <h2>Entre em contato conosco</h2>
          <p className="description-section-title">
              Faça parte da mudança que você deseja ver no mundo. Encontre seu projeto
              de voluntariado ideal agora
          </p>
      </div>
      <div className={styles['form-info-container']}>
        <Info />
        <Form />

      </div>
    </section>
  );
};
