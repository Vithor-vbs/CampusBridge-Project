import { AboutUs } from "./AboutUs/AboutUs";
import { Header } from "./Header";
import styles from "./Home.module.css";
import { TitleSection } from "./TitleSection";
import { OportunitiesHome } from "./Oportunities/OportunitiesHome";
import { Footer } from "./Footer/Footer";
import { CarouselSection } from "./Carousel/CarouselSection";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../GraphQL/Queries";

export const Home = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (!loading) {
    console.log(data);
    if (data.getUser == null || error) {
      window.location.href = "/login";
    }
  }

  return (
    <>
      <Header pageIndex="home" />
      <section className={styles["home-section"]}>
        <TitleSection />
        <CarouselSection />
        <OportunitiesHome />
        <AboutUs />
        <Footer />
      </section>
    </>
  );
};
