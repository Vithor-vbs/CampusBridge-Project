import styles from "./Opportunities.module.css";
import { OpportunitiesContent } from "./OpportunitiesContent";
import { HeaderSubPage } from "../utils/HeaderSubPage";
import { Footer } from "../HomePage/Footer/Footer";
import { OpportunitiesPagination } from "./OpportunitiesPagination";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_FILTERED_OPORTUNITIES,
  GET_OPORTUNITIES,
} from "../../GraphQL/Queries";

export const Opportunities = () => {
  const [page, setPage] = useState(0);
  console.log("page ", page);

  const PAGE_SIZE = 8;
  const offset = page * PAGE_SIZE;
  const paginationAux = PAGE_SIZE * (page + 1);

  const allResults = useQuery(GET_OPORTUNITIES);
  console.log("allresults ", allResults?.data);

  const allResultsCount: number =
    allResults?.data?.getAllOpportunities.totalCount;
  const filteredResults = useQuery(GET_FILTERED_OPORTUNITIES, {
    variables: { limit: PAGE_SIZE, offset: offset },
  });
  if (filteredResults.error) {
    throw new Error(`Error! ${filteredResults.error.message}`);
  }

  return (
    <section className={styles["section-container"]}>
      <HeaderSubPage item={"Oportunidades"} />
      <OpportunitiesContent
        allResults={allResults}
        filteredResults={filteredResults}
        page={page}
      />
      <OpportunitiesPagination
        allResultsCount={allResultsCount}
        setPage={setPage}
        page={page}
        offset={offset}
        paginationAux={paginationAux}
      />
      <Footer />
    </section>
  );
};
