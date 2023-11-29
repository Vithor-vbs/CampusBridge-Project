import { Carousel } from "./Carousel";
import { slides } from "./slides.json";
import "./CarouselSection.css";

export const CarouselSection = () => {
  return (
    <section className="slides-container">
      <div className="slides-content-box">
        <h2>Destaques</h2>
        <Carousel data={slides} />
      </div>
    </section>
  );
};
