import "./Header.css";
import { Link } from "react-router-dom";

import campusBridgeWhiteLogo from "../../assets/white-name-logo.png";

interface HeaderSectionProps {
  pageIndex: string;
}

// const sectionHeroEl = document.querySelector(".section-hero");

// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     console.log(ent);

//     if (ent.isIntersecting === false) {
//       document.body.classList.add("sticky");
//     }

//     if (ent.isIntersecting === true) {
//       document.body.classList.remove("sticky");
//     }
//   },
//   {
//     // In the viewport
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   }
// );
// obs.observe(sectionHeroEl);

export function Header(props: HeaderSectionProps) {
  return (
    <section className="header-section">
      <div className="header-container">
        <a className="home-redirect" href="/">
          <img
            className="header-main-image"
            src={campusBridgeWhiteLogo}
            alt="CampusBridge agency name"
          />
        </a>

        <div className="header-properties-box">
          <Link to="/Oportunidades" className="properties-name">
            Projetos
          </Link>
          <Link
            to="/Carreira"
            className={`properties-name ${
              props.pageIndex === "aboutUs" ? "pageIndex-modified" : ""
            }`}
          >
            Sobre nós
          </Link>
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
          to="/contact"
          className={`properties-name ${
            props.pageIndex === "careers" ? "pageIndex-modified" : ""
          }`}
        >
          Contate-nos
        </Link>
      </div>
    </section>
  );
}
