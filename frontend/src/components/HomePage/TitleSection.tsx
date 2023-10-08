import { motion } from "framer-motion";
import { DescriptionSection } from "./DescriptionSection";
import "./TitleSection.css";
import connectedWorld from "../../assets/undraw_connected_world_wuay.svg";
import { ButtonCTA } from "./ButtonCTA";

export const TitleSection = () => {
  return (
    <section className="title-section">
      <motion.div
        className="title-description-box"
        animate={{ x: 100 }}
        initial={{ x: -100 }}
        transition={{ duration: 2 }}
      >
        <div className="home-title-container">
          <span className="title-first-line">
            Sua jornada de <span className="underlined-text">impacto</span>
          </span>
          <span className="title-sec-line">começa aqui</span>
        </div>
        <DescriptionSection />
        <ButtonCTA />
      </motion.div>
      <div>
        <img
          src={connectedWorld}
          className="home-title-image"
          alt="Mapa mundial"
        />
      </div>
    </section>
  );
};
