import { useState } from "react";
import "./OportunitiesHome.css";
import styles from "../ButtonCTA.module.css";
import genericImage from "../../../assets/svg-generic.svg";

export const OportunitiesHome = () => {
  const [showMore, setShowMore] = useState(false);

  const opportunitiesList = [
    {
      company: "Vortex",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      company: "Coral&co.",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      company: "Dtec",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      company: "Amaro",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },    
  ];

  const initialOpportunities = [
    {
      company: "Vortex",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      company: "Coral&co.",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      company: "Dtec",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
    {
      company: "Amaro",
      jobTitle: "Desenvolvedor de Software",
      duration: "4 meses",
    },
  ];

  const displayedOpportunities = showMore
    ? [...initialOpportunities, ...opportunitiesList]
    : initialOpportunities;

  const handleSeeMoreClick = () => {
    setShowMore(true);
  };

  return (
    <section className="oportunities-home-grid">
      <h2>Nossas Oportunidades</h2>
      <div className="op-grid">
        {displayedOpportunities.map((opportunity, index) => (
          <div key={index} className="op-object">
            <div>
              <img src={genericImage} alt="" />
              <div className="info">
                <h3>{opportunity.company}</h3>
                <p>{opportunity.jobTitle}</p>
                <p>
                  Período: <strong>{opportunity.duration}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="see-more">
        {!showMore && (
          <button className={styles["button2"]} onClick={handleSeeMoreClick}>
            See More
          </button>
        )}
      </div>
    </section>
  );
};
