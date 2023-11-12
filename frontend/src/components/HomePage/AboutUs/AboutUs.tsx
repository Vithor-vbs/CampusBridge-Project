import associateImg from "../../../assets/associating.svg";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <section className="AboutUs-section-container">
      <div className="aboutUs-header-box">
        <h2>Sobre nós</h2>
        <div className="aboutUs-text-box">
          <p style={{ marginBottom: "1rem" }}>
            O CampusBridge é uma associação vinculada à Universidade de
            Fortaleza (UNIFOR). Nossa jornada começa com um
            <span className="blue-lighter"> compromisso profundo </span>
            com a promoção do engajamento cívico e do voluntariado entre os
            estudantes universitários.
          </p>
          <p>
            Nossa missão é
            <span className="blue-lighter"> inspirar e capacitar jovens </span>
            enquanto fortalecemos a conexão entre educação de qualidade e
            responsabilidade social. Junte-se a nós e comece sua jornada de
            impacto hoje mesmo.
          </p>
        </div>
      </div>

      <img
        className="about-us-image"
        src={associateImg}
        alt="association Unifor x Campusbridge"
      />
    </section>
  );
};
