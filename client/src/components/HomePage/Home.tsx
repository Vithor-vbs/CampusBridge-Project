import { AboutUs } from "./AboutUs/AboutUs";
import { Header } from "./Header";
import styles from "./Home.module.css";
import { TitleSection } from "./TitleSection";
import { OportunitiesHome } from "./Oportunities/OportunitiesHome";
import { Footer } from "./Footer/Footer";
import { CarouselSection } from "./Carousel/CarouselSection";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../GraphQL/Queries";
import { useNavigate } from "react-router";
import { UserQueryResult } from "../../components/types";

export const Home = () => {
  const navigate = useNavigate();

  const { data }: UserQueryResult = useQuery(GET_USER);

  return (
    <>
      <Header pageIndex="home" />
      <section className={styles["home-section"]}>
        <TitleSection getUser={data?.getUser} />
        <CarouselSection />
        <OportunitiesHome />
        <AboutUs />
        <Footer />
      </section>
    </>
  );
};
