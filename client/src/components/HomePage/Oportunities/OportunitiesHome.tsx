import { useState } from "react";
import "./OportunitiesHome.css";
import genericImage from "../../../assets/svg-generic.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_OPORTUNITIES } from "../../../GraphQL/Queries";

import { Opportunity } from "../../types";

export const OportunitiesHome = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const handleMouseEnter = (key: string) => {
    setHoveredKey(key);
  };

  const handleMouseLeave = () => {
    setHoveredKey(null);
  };

  const { loading, error, data } = useQuery(GET_FILTERED_OPORTUNITIES, {
    variables: { limit: 8, offset: 0 },
  });
  if (error) {
    throw new Error(`Error! ${error.message}`);
  }

  return (
    <section className="oportunities-home-grid">
      <h2>Nossas Oportunidades</h2>
      <div className="op-grid">
        {loading && !error ? (
          <>Loading</>
        ) : (
          data.getFilteredOpportunities.opportunities.map(
            (opportunity: Opportunity, index: number) => (
              <div
                key={index}
                className={`op-object ${
                  opportunity.id === hoveredKey ? "hovered" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(opportunity.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() =>
                  (window.location.href = `/Oportunidades/${opportunity.id}`)
                }
                style={{ cursor: "pointer" }}
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
                  <button
                    onClick={() =>
                      (window.location.href = `/Oportunidades/${opportunity.id}`)
                    }
                  >
                    Leia mais
                  </button>
                )}
              </div>
            )
          )
        )}
      </div>
      <div className="see-more">
        <a href="/Oportunidades" className="properties-name op-adjust">
          <span>mostrar mais</span> <BsArrowRightShort size="1.5rem" />
        </a>
      </div>
    </section>
  );
};
