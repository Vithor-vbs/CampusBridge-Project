import styles from "./Opportunities.module.css";
import { OpportunitiesContent } from "./OpportunitiesContent";
import { HeaderSubPage } from "../utils/HeaderSubPage";
import { Footer } from "../HomePage/Footer/Footer";
import { OpportunitiesPagination } from "./OpportunitiesPagination";
import { useState } from "react";

export const Opportunities = () => {
  const [page, setPage] = useState(0);

  return (
    <section className={styles["section-container"]}>
      <HeaderSubPage item={"Oportunidades"} />
      <OpportunitiesContent page={page} />
      <OpportunitiesPagination setPage={setPage} page={page} />
      <Footer />
    </section>
  );
};
