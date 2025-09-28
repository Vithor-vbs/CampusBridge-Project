import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../GraphQL/Queries";
import { ENROLL_IN_OPPORTUNITY } from "../../GraphQL/Mutations";
import styles from "./OpportunityDetails.module.css";

interface Opportunity {
  id: string;
  company: string;
  duration: string;
  jobTitle: string;
  description: string;
  area: string;
  tags: string[];
  image?: string;
}

interface User {
  id: string;
  competences: string[];
  enrolledOpportunities: Opportunity[];
}

interface UserData {
  getUser: User;
}

interface VacancyContentProps {
  opportunity: Opportunity | null;
  loading: boolean;
  error?: boolean;
}

export const VacancyContent = ({
  opportunity,
  loading,
  error,
}: VacancyContentProps) => {
  const { data: userData, refetch } = useQuery<UserData>(GET_USER);
  const [enrollInOpportunity] = useMutation(ENROLL_IN_OPPORTUNITY);

  const user = userData?.getUser;
  if (loading) {
    return (
      <section className={styles.opportunityDetails}>
        <div className={styles.container}>
          <div>Carregando...</div>
        </div>
      </section>
    );
  }

  if (error || !opportunity) {
    return (
      <section className={styles.opportunityDetails}>
        <div className={styles.container}>
          <div>Oportunidade não encontrada</div>
        </div>
      </section>
    );
  }

  // Function to get company initials for logo placeholder
  const getCompanyInitials = (companyName: string) => {
    return companyName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Sample eligibility requirements based on area
  const getEligibilityRequirements = (area: string, tags: string[]) => {
    // Different backgrounds based on area
    const backgroundMap: { [key: string]: string[] } = {
      Technology: ["Ciência da Computação", "Engenharia de Software"],
      "Science & Research": ["Ciências", "Pesquisa"],
      "Social Services": ["Serviço Social", "Psicologia"],
      default: ["Ciência da Computação"],
    };

    const requirements = {
      background: backgroundMap[area] || backgroundMap.default,
      technologies: tags.filter((tag) =>
        [
          "React",
          "JavaScript",
          "Python",
          "HTML/CSS",
          "TypeScript",
          "PostgreSQL",
        ].includes(tag)
      ),
    };

    return requirements;
  };

  const eligibilityReqs = getEligibilityRequirements(
    opportunity.area,
    opportunity.tags
  );

  // Check user competence matching
  const getUserCompetenceMatch = () => {
    if (!user?.competences) {
      return {
        hasRequiredCompetences: [],
        missingCompetences: eligibilityReqs.technologies,
        isEligible: false,
      };
    }

    const hasRequiredCompetences = eligibilityReqs.technologies.filter((tech) =>
      user.competences.some(
        (userComp) =>
          userComp.toLowerCase().includes(tech.toLowerCase()) ||
          tech.toLowerCase().includes(userComp.toLowerCase())
      )
    );

    const missingCompetences = eligibilityReqs.technologies.filter(
      (tech) =>
        !user.competences.some(
          (userComp) =>
            userComp.toLowerCase().includes(tech.toLowerCase()) ||
            tech.toLowerCase().includes(userComp.toLowerCase())
        )
    );

    const isEligible =
      missingCompetences.length === 0 &&
      eligibilityReqs.technologies.length > 0;

    return {
      hasRequiredCompetences,
      missingCompetences,
      isEligible: isEligible || eligibilityReqs.technologies.length === 0,
    };
  };

  const competenceMatch = getUserCompetenceMatch();

  // Check if user is already enrolled
  const isAlreadyEnrolled = user?.enrolledOpportunities?.some(
    (opp) => opp.id === opportunity.id
  );

  const handleEnrollment = async () => {
    try {
      await enrollInOpportunity({
        variables: { opportunityId: opportunity.id },
      });
      // Refresh user data to show updated enrollment status
      await refetch();
    } catch (error) {
      console.error("Error enrolling in opportunity:", error);
    }
  };

  return (
    <section className={styles.opportunityDetails}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Left Column - Main Content */}
          <div className={styles.leftColumn}>
            {/* Company Header */}
            <div className={styles.companyHeader}>
              <div className={styles.companyLogo}>
                {opportunity.image ? (
                  <img
                    src={opportunity.image}
                    alt={`Logo ${opportunity.company}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  getCompanyInitials(opportunity.company)
                )}
              </div>
              <div className={styles.companyInfo}>
                <h1>{opportunity.jobTitle}</h1>
                <p>{opportunity.company}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className={styles.jobDescription}>
              <h2>Objetivos do trabalho</h2>
              <p>{opportunity.description}</p>
            </div>

            {/* Eligibility Section */}
            <div className={styles.eligibilitySection}>
              <h3>Elegibilidade</h3>

              <div className={styles.requirementCategory}>
                <h4>Background:</h4>
                <div className={styles.tags}>
                  {eligibilityReqs.background.map((req, index) => (
                    <span key={index} className={styles.tag}>
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.requirementCategory}>
                <h4>Tecnologias requeridas:</h4>
                <div className={styles.tags}>
                  {eligibilityReqs.technologies.length > 0 ? (
                    eligibilityReqs.technologies.map((tech, index) => {
                      const hasCompetence =
                        competenceMatch.hasRequiredCompetences.includes(tech);
                      return (
                        <span
                          key={index}
                          className={`${styles.tag} ${
                            hasCompetence
                              ? styles.tagMatched
                              : styles.tagMissing
                          }`}
                          title={
                            hasCompetence
                              ? "Você possui esta competência"
                              : "Competência em falta"
                          }
                        >
                          {hasCompetence ? "✓ " : "× "}
                          {tech}
                        </span>
                      );
                    })
                  ) : (
                    <span className={styles.tag}>A definir</span>
                  )}
                </div>
              </div>

              {opportunity.area && (
                <div className={styles.requirementCategory}>
                  <h4>Área:</h4>
                  <div className={styles.tags}>
                    <span className={styles.tag}>{opportunity.area}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Application Card & Eligibility */}
          <div className={styles.rightColumn}>
            {/* Application Card */}
            <div className={styles.applicationCard}>
              <div className={styles.periodInfo}>
                <p>Período:</p>
                <p>{opportunity.duration}</p>
                <small>Até quando a oportunidade estará disponível</small>
              </div>
              <button
                className={styles.applyButton}
                onClick={handleEnrollment}
                disabled={isAlreadyEnrolled}
              >
                {isAlreadyEnrolled ? "Já Inscrito" : "Aplicar"}
              </button>
            </div>

            {/* Eligibility Status Card */}
            <div className={styles.eligibilityCard}>
              <div className={styles.eligibilityHeader}>
                <span
                  className={`${styles.eligibilityIcon} ${
                    competenceMatch.isEligible
                      ? styles.eligible
                      : styles.notEligible
                  }`}
                >
                  {competenceMatch.isEligible ? "✓" : "!"}
                </span>
                <h3>
                  {competenceMatch.isEligible
                    ? "Você é elegível!"
                    : "Requisitos em falta"}
                </h3>
              </div>

              {competenceMatch.isEligible ? (
                <>
                  <p className={styles.eligibilityMessage}>
                    Seu perfil está de acordo com os conhecimentos requeridos
                  </p>
                  <p className={styles.eligibilitySubtext}>
                    Baseado nas informações do seu perfil, você atende aos
                    requisitos desta oportunidade.
                  </p>
                </>
              ) : (
                <>
                  <p className={styles.eligibilityMessage}>
                    {competenceMatch.missingCompetences.length > 0
                      ? `Faltam ${competenceMatch.missingCompetences.length} competência(s):`
                      : "Complete seu perfil para verificar elegibilidade"}
                  </p>
                  {competenceMatch.missingCompetences.length > 0 && (
                    <div className={styles.missingCompetences}>
                      {competenceMatch.missingCompetences.map((comp, index) => (
                        <span
                          key={index}
                          className={styles.missingCompetenceTag}
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className={styles.eligibilitySubtext}>
                    <Link to="/Perfil" className={styles.profileLink}>
                      Atualize seu perfil
                    </Link>{" "}
                    para adicionar essas competências.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
