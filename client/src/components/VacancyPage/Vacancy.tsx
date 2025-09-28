import { VacancyContent } from "./VacancyContent";
import { Header } from "../HomePage/Header";
import { HeaderSubPage } from "../utils/HeaderSubPage";
import { Footer } from "../HomePage/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_OPPORTUNITY } from "../../GraphQL/Queries";

interface Opportunity {
  id: string;
  company: string;
  duration: string;
  jobTitle: string;
  description: string;
  area: string;
  tags: string[];
  image?: string;
}

interface OpportunityData {
  getOpportunity: Opportunity;
}

export const Vacancy = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, data } = useQuery<OpportunityData>(GET_OPPORTUNITY, {
    variables: { id },
    skip: !id,
  });

  const opportunityTitle = data?.getOpportunity?.jobTitle || "Afiliação";

  return (
    <section style={{ marginTop: "6rem" }}>
      <Header pageIndex="oportunidade" />
      <HeaderSubPage item={opportunityTitle} />
      <VacancyContent
        opportunity={data?.getOpportunity || null}
        loading={loading}
      />
      <Footer />
    </section>
  );
};
