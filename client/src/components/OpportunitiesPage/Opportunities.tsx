import styles from "./Opportunities.module.css";
import { OpportunitiesContent } from "./OpportunitiesContent";
import { HeaderSubPage } from "../utils/HeaderSubPage";
import { Footer } from "../HomePage/Footer/Footer";
import { OpportunitiesPagination } from "./OpportunitiesPagination";

export const Opportunities = () => {
  return (
    <section className={styles["section-container"]}>
      <HeaderSubPage item={"Oportunidades"} />
      <OpportunitiesContent />
      <OpportunitiesPagination />
      <Footer />
    </section>
  );
};
