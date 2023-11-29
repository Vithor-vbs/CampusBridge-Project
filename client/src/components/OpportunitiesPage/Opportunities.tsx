import styles from "./Opportunities.module.css";
import { OpportunitiesContent } from "./OpportunitiesContent";
import { OpportunitiesHeader } from "./OpportunitiesHeader";
import { Footer } from "../HomePage/Footer/Footer";
import { OpportunitiesPagination } from "./OpportunitiesPagination";

export const Opportunities = () => {
  return (
    <section className={styles["section-container"]}>
      <OpportunitiesHeader />
      <OpportunitiesContent />
      <OpportunitiesPagination />
      <Footer />
    </section>
  );
};
