import "./OpportunitiesContent.css";
import sampleImage from "../../assets/image-example.png";
import { BsArrowRightShort } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_OPORTUNITIES } from "../../GraphQL/Queries";
import { Opportunity } from "../types";
import { useState } from "react";

export const OpportunitiesContent = () => {
  const { loading, error, data } = useQuery(GET_OPORTUNITIES);
  if (error) {
    throw new Error(`Error! ${error.message}`);
  }

  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleFilterClick = (area: string) => {
    setSelectedArea(area);
  };

  let uniqueAreas: string[] = [];

  if (!loading && data) {
    uniqueAreas = Array.from(
      new Set(
        data.getOpportunities.map(
          (opportunity: Opportunity) => opportunity.area
        )
      )
    );
  }

  return (
    <section className="op-content-section">
      <div className="op-content-box">
        {!loading &&
          data.getOpportunities
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
                  <a
                    href="/oportunidades"
                    className="properties-name op-adjust"
                  >
                    <span>mostrar mais</span>{" "}
                    <BsArrowRightShort size="1.5rem" />
                  </a>
                  <p>
                    <FaCalendar /> <span>{opportunity.duration}</span>
                  </p>
                </div>
              </div>
            ))}
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
                      data.getOpportunities.filter(
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
