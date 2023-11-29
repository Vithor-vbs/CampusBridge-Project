import styles from "./OpportunitiesHeader.module.css";
import { IoIosArrowForward } from "react-icons/io";

export const OpportunitiesHeader = () => {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-flex"]}>
        <h2>Oportunidades</h2>
        <p>
          <a href="/" className={styles["bold-link"]}>
            Home
          </a>
          <IoIosArrowForward size="12px" />
          <span>Oportunidades</span>
        </p>
      </div>
    </div>
  );
};
