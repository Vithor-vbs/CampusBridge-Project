import styles from "./OpportunitiesPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface OpportunitiesContentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export const OpportunitiesPagination = ({
  setPage,
  page,
}: OpportunitiesContentProps) => {
  return (
    <section className={styles["pagination-container"]}>
      <div className={styles["pagination-flex"]}>
        <div className={styles["pagination-left"]}>
          <button
            disabled={!page}
            onClick={() => setPage((prev) => prev - 1)}
            className={styles["pagination-button"]}
          >
            <IoIosArrowBack size="1.8rem" />
          </button>
          <p className={styles["pagination-page-index"]}>{page + 1}</p>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={styles["pagination-button"]}
          >
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
