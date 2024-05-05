import styles from "./OpportunitiesPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface OpportunitiesContentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  allResultsCount: number;
  offset: number;
  paginationAux: number;
}

export const OpportunitiesPagination = ({
  setPage,
  page,
  allResultsCount,
  paginationAux,
  offset,
}: OpportunitiesContentProps) => {
  if (paginationAux > allResultsCount) {
    paginationAux = allResultsCount;
  }

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
            disabled={paginationAux >= allResultsCount}
          >
            <IoIosArrowForward size="1.8rem" />
          </button>
        </div>
        <div className={styles["pagination-right"]}>
          <p>
            {offset}-{paginationAux} de {allResultsCount} resultados
          </p>
        </div>
      </div>
    </section>
  );
};
