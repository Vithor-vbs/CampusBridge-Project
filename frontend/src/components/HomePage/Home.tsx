import { AboutUs } from "./AboutUs/AboutUs";
import { Header } from "./Header";
import styles from "./Home.module.css";
import { TitleSection } from "./TitleSection";

export const Home = () => {
  return (
    <>
      <Header pageIndex="home" />
      <TitleSection />
      <AboutUs />
    </>
  );
};
