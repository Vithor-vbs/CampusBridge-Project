import "./OpportunitiesContent.css";
import sampleImage from "../../assets/image-example.png";
import { BsArrowRightShort } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { Opportunity } from "../types";
import { useState } from "react";
import { Link } from "react-router-dom";

interface OpportunitiesContentProps {
  allResults: any;
  filteredResults: any;
}

export const OpportunitiesContent = ({
  allResults,
  filteredResults,
}: OpportunitiesContentProps) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleFilterClick = (area: string) => {
    setSelectedArea((prevArea) => (prevArea === area ? null : area));
  };

  let uniqueAreas: string[] = [];

  if (!allResults.loading && allResults.data) {
    uniqueAreas = Array.from(
      new Set(
        allResults.data.getAllOpportunities.opportunities.map(
          (opportunity: Opportunity) => opportunity.area
        )
      )
    );
  }

  return (
    <section className="op-content-section">
      <div className="op-content-box">
        {!filteredResults.loading &&
          filteredResults.data.getFilteredOpportunities.opportunities
            .filter(
              (opportunity: Opportunity) =>
                !selectedArea || opportunity.area === selectedArea
            )
            .map((opportunity: Opportunity) => (
              <div className="op-item-box" key={opportunity.id}>
                <h2>{opportunity.jobTitle}</h2>
                <img src={sampleImage} alt="" />
                <p className="op-content-description">
                  {opportunity.description}
                </p>
                <div className="op-content-bottom">
                  <Link
                    to={`/Oportunidades/${opportunity.id}`}
                    className="properties-name op-adjust"
                  >
                    <span>mostrar mais</span>
                    <BsArrowRightShort size="1.5rem" />
                  </Link>
                  <p>
                    <FaCalendar /> <span>{opportunity.duration}</span>
                  </p>
                </div>
              </div>
            ))}
        {allResults?.data?.getAllOpportunities.totalCount === 0 && (
          <div>
            <h2 style={{ fontSize: "2rem" }}>
              Nenhuma oportunidade encontrada
            </h2>
          </div>
        )}
      </div>
      <div className={"form-group"}>
        <input
          placeholder="Procurar"
          type="text"
          id="email"
          name="email"
          required
        />

        <div className="op-filters">
          <h3>Filtros</h3>
          <ul>
            {uniqueAreas
              .filter((area) => Boolean(area)) // filter out falsy values
              .map((area, index) => (
                <li
                  className={selectedArea === area ? "op-filter-clicked" : ""}
                  key={index}
                  onClick={() => handleFilterClick(area)}
                >
                  <span>{area}</span>
                  <p>
                    {
                      allResults.data.getAllOpportunities.opportunities.filter(
                        (opportunity: Opportunity) => opportunity.area === area
                      ).length
                    }
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
