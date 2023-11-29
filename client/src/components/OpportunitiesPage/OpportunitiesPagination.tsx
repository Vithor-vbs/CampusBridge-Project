import styles from "./OpportunitiesPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const OpportunitiesPagination = () => {
  return (
    <section className={styles["pagination-container"]}>
      <div className={styles["pagination-flex"]}>
        <div className={styles["pagination-left"]}>
          <button className={styles["pagination-button"]}>
            <IoIosArrowBack size="1.8rem" />
          </button>
          <p className={styles["pagination-page-index"]}> 1</p>
          <button className={styles["pagination-button"]}>
            <IoIosArrowForward size="1.8rem" />
          </button>
        </div>
        <div className={styles["pagination-right"]}>
          <p>1-10 de 100 resultados</p>
        </div>
      </div>
    </section>
  );
};
