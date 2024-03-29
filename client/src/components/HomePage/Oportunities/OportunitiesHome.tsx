import { useState } from "react";
import "./OportunitiesHome.css";
import genericImage from "../../../assets/svg-generic.svg";
import { BsArrowRightShort } from "react-icons/bs";

export const OportunitiesHome = () => {
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);

  const handleMouseEnter = (key: number) => {
    setHoveredKey(key);
  };

  const handleMouseLeave = () => {
    setHoveredKey(null);
  };

  const initialOpportunities = [
    {
      id: 1,
      company: "Vortex",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 2,
      company: "Coral&co.",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 3,
      company: "Dtec",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 4,
      company: "Amaro",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 5,
      company: "Vortex",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 6,
      company: "Coral&co.",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 7,
      company: "Dtec",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      id: 8,
      company: "Amaro",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
  ];

  return (
    <section className="oportunities-home-grid">
      <h2>Nossas Oportunidades</h2>
      <div className="op-grid">
        {initialOpportunities.slice(0, 8).map((opportunity, index) => (
          <div
            key={index}
            className={`op-object ${
              opportunity.id === hoveredKey ? "hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(opportunity.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grey-mask">
              <img src={genericImage} alt="" className="op-image" />
              <div className="info">
                <h3>{opportunity.company}</h3>
                <p>{opportunity.jobTitle}</p>
                <p>
                  Período: <strong>{opportunity.duration}</strong>
                </p>
              </div>
            </div>
            {opportunity.id === hoveredKey && (
              <button onClick={() => console.log("Button Clicked")}>
                Leia mais
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="see-more">
        <a href="/oportunidades" className="properties-name op-adjust">
          <span>mostrar mais</span> <BsArrowRightShort size="1.5rem" />
        </a>
      </div>
    </section>
  );
};
