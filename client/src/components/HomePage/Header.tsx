import { Link } from "react-router-dom";
import campusBridgeWhiteLogo from "../../assets/CampusBridge-vectorized.svg";
import "./Header.css";

interface HeaderSectionProps {
  pageIndex: string;
}

export function Header(props: HeaderSectionProps) {
  return (
    <section className="header-section sticky">
      <div className="header-container">
        <a className="home-redirect" href="/">
          <img
            className="header-main-image"
            src={campusBridgeWhiteLogo}
            alt="CampusBridge agency name"
          />
        </a>

        <div className="header-properties-box">
          <a
            href="/oportunidades"
            className={`properties-name ${
              props.pageIndex === "oportunidades" ? "pageIndex-modified" : ""
            }`}
          >
            Oportunidades
          </a>
          <a
            href="/#aboutUs"
            className={`properties-name ${
              props.pageIndex === "aboutUs" ? "pageIndex-modified" : ""
            }`}
          >
            Sobre nós
          </a>
          <Link
            to="/Perfil"
            className={`properties-name ${
              props.pageIndex === "projects" ? "pageIndex-modified" : ""
            }`}
          >
            Perfil
          </Link>
        </div>
        <Link
          to="/contato"
          className={`properties-name ${
            props.pageIndex === "contato" ? "pageIndex-modified" : ""
          }`}
        >
          Contate-nos
        </Link>
      </div>
    </section>
  );
}
