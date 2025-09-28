import { DescriptionSection } from "./DescriptionSection";
import "./TitleSection.css";
import connectedWorld from "../../assets/undraw_connected_world_wuay.svg";
import { ButtonCTA } from "./ButtonCTA";

interface UserDataProps {
  getUser:
    | {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      }
    | undefined;
}

export const TitleSection = (props: UserDataProps) => {
  return (
    <section className="title-section">
      {props.getUser?.firstName && (
        <p className="welcome-back-message">
          Bom te ver de novo, <span>{props.getUser.firstName}</span>
        </p>
      )}{" "}
      <div className="title-section-container">
        <div className="title-description-box">
          <div className="home-title-container">
            <span className="title-first-line">
              Sua jornada de <span className="underlined-text">impacto</span>
            </span>
            <span className="title-sec-line">começa aqui</span>
          </div>
          <DescriptionSection />
          <ButtonCTA linkTo="/Oportunidades" text="Veja as Oportunidades" />
        </div>
        <img
          src={connectedWorld}
          className="home-title-image"
          alt="Mapa mundial"
        />
      </div>
    </section>
  );
};
