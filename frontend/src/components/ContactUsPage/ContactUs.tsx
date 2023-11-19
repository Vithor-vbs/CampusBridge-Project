import styles from "./ContactUs.module.css";
import { IoIosArrowForward } from "react-icons/io";

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
    </section>
  );
};
