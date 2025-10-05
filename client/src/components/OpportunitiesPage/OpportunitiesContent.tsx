import "./OpportunitiesContent.css"
import sampleImage from "../../assets/image-example.png";
import { BsArrowRightShort } from "react-icons/bs"
import { FaCalendar, FaHeart, FaUsers, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useState } from "react"
import type { Opportunity } from "../types"
import { CreateDonationModal } from "./DonationModal/CreateDonationModal"
import { useMutation } from "@apollo/client";
import { CREATE_DONATION_MUTATION } from "../../GraphQL/Mutations";

interface OpportunitiesContentProps {
  allResults: any
  filteredResults: any
}

const typeLabels: Record<string, string> = {
  volunteering: "Voluntariado",
  donation: "Doações",
  Todos: "Todos",
}

export const OpportunitiesContent = ({ allResults, filteredResults }: OpportunitiesContentProps) => {
  const [selectedArea, setSelectedArea] = useState<string>("Todos")
  const [selectedType, setSelectedType] = useState<string>("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDonationOpen, setIsCreateDonationOpen] = useState(false)

  const handleAreaFilterClick = (area: string) => setSelectedArea(area)
  const handleTypeFilterClick = (type: string) => setSelectedType(type)

  const [createDonation] = useMutation(CREATE_DONATION_MUTATION)

  const handleDonationSubmit = async (donationData: any) => {
    try {
      const tagsArray = donationData.tags
        ? donationData.tags.split(",").map((t: string) => t.trim())
        : []

      await createDonation({
        variables: {
          jobTitle: donationData.jobTitle,
          company: donationData.company,
          description: donationData.description,
          area: donationData.area,
          duration: donationData.duration,
          tags: tagsArray,
          image: donationData.image || "",
          amount: donationData.amount,
          type: "donation",
        },
      })

      alert("Doação criada com sucesso!")

      if (allResults.refetch) await allResults.refetch()
      if (filteredResults.refetch) await filteredResults.refetch()

    } catch (error) {
      console.error("Error while create donation:", error)
    }
  }

  let uniqueAreas: string[] = []
  let uniqueTypes: string[] = []
  let opportunities: Opportunity[] = []

  if (!allResults.loading && allResults.data) {
    opportunities = allResults.data.getAllOpportunities.opportunities
    uniqueAreas = Array.from(new Set(opportunities.map((o) => o.area).filter(Boolean)))
    uniqueTypes = Array.from(new Set(opportunities.map((o) => o.type).filter(Boolean)))
  }

  const areasWithAll = ["Todos", ...uniqueAreas]
  const typesWithAll = ["Todos", ...uniqueTypes]

  const filteredOpportunities =
    !filteredResults.loading && filteredResults.data
      ? filteredResults.data.getFilteredOpportunities.opportunities.filter((opportunity: Opportunity) => {
        const matchesArea = selectedArea === "Todos" || opportunity.area === selectedArea
        const matchesType = selectedType === "Todos" || opportunity.type === selectedType
        const matchesSearch =
          opportunity.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesArea && matchesType && matchesSearch
      })
      : []

  return (
    <div className="op-content-section">
      <div className="op-content-main">
        <main className="op-content-left">
          {filteredOpportunities.map((opportunity: Opportunity) => (
            <div key={opportunity.id} className="opportunity-card">
              <Link to={`/Oportunidades/${opportunity.id}`} className="opportunity-link">
                <div className="opportunity-inner">
                  <div className="opportunity-image">
                    <img
                      src={opportunity.image || sampleImage}
                      alt={opportunity.jobTitle}
                    />
                  </div>
                  <div className="opportunity-content">
                    <h2>{opportunity.jobTitle}</h2>
                    <div className="opportunity-badges">
                      <span className={`opportunity-type ${opportunity.type}`}>
                        {opportunity.type === "volunteering" ? <FaUsers /> : <FaHeart />}
                        {typeLabels[opportunity.type]}
                      </span>
                      <span className="opportunity-area">{opportunity.area}</span>
                    </div>
                    <p>{opportunity.description}</p>
                    <div className="opportunity-bottom">
                      <div className="opportunity-duration">
                        <FaCalendar />
                        <span>{opportunity.duration}</span>
                      </div>
                      <span className="opportunity-more">
                        mostrar mais
                        <BsArrowRightShort size="2rem" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {filteredOpportunities.length === 0 && (
            <div className="opportunity-empty">
              <h2>Nenhuma oportunidade encontrada</h2>
            </div>
          )}
        </main>

        <aside className="op-content-right">
          <div className="op-sidebar">
            <input
              placeholder="Procurar"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="op-search"
            />

            <div className="op-filters">
              <h3>Tipo</h3>
              {typesWithAll.map((type, index) => (
                <button
                  key={index}
                  className={`op-filter-btn ${selectedType === type ? "op-filter-clicked" : ""}`}
                  onClick={() => handleTypeFilterClick(type)}
                >
                  <span>{typeLabels[type] || type}</span>
                  <span>
                    {type === "Todos"
                      ? opportunities.length || 0
                      : opportunities.filter((o) => o.type === type).length || 0}
                  </span>
                </button>
              ))}
            </div>

            <div className="op-filters">
              <h3>Filtros</h3>
              {areasWithAll.filter(Boolean).map((area, index) => (
                <button
                  key={index}
                  className={`op-filter-btn ${selectedArea === area ? "op-filter-clicked" : ""}`}
                  onClick={() => handleAreaFilterClick(area)}
                >
                  <span>{area}</span>
                  <span>
                    {area === "Todos"
                      ? opportunities.length || 0
                      : opportunities.filter((o) => o.area === area).length || 0}
                  </span>
                </button>
              ))}
            </div>

            <button className="op-create-btn" onClick={() => setIsCreateDonationOpen(true)}>
              <FaPlus />
              Criar Doação
            </button>
          </div>
        </aside>
      </div>

      <CreateDonationModal
        isOpen={isCreateDonationOpen}
        onClose={() => setIsCreateDonationOpen(false)}
        onSubmit={handleDonationSubmit}
      />
    </div>
  )
}
