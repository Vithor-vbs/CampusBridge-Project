import { AboutUs } from "./AboutUs/AboutUs";
import { Header } from "./Header";
import styles from "./Home.module.css";
import { TitleSection } from "./TitleSection";
import { OportunitiesHome } from "./Oportunities/OportunitiesHome";

export const Home = () => {
  return (
    <>
      <Header pageIndex="home" />
      <section className={styles["home-section"]}>
        <TitleSection />
        <OportunitiesHome />
        <AboutUs />
      </section>
    </>
  );
};
