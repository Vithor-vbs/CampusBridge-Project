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

export const Home = () => {
  const navigate = useNavigate();

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  interface QueryResult {
    loading: boolean;
    error?: Error;
    data:
      | {
          getUser: User;
        }
      | undefined;
  }

  const result: QueryResult = useQuery(GET_USER);

  const { loading, error, data } = result;

  if (!loading) {
    console.log(data);
    if (!data || error) {
      navigate("/login");
    }
  }

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
