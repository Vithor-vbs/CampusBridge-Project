import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../GraphQL/Queries";
import styles from "./ProfilePage.module.css";
import { EditProfileModal } from "./EditProfileModal";

interface User {
  _id: string;
  email: string;
  name: string;
  profileImage?: string;
  bio?: string;
  university?: string;
  course?: string;
  competences: string[];
  enrolledOpportunities: Opportunity[];
  completedOpportunities: Opportunity[];
  volunteerHours: number;
  projectsCompleted: number;
  donationsMade: number;
}

interface Opportunity {
  id: string;
  company: string;
  jobTitle: string;
  duration: string;
  area: string;
  tags: string[];
  description: string;
  image?: string;
}

interface UserData {
  getUser: User;
}

export const ProfileContent = () => {
  const [activeTab, setActiveTab] = useState<"enrolled" | "completed">(
    "enrolled"
  );
  const [showEditModal, setShowEditModal] = useState(false);

  const { loading, data, refetch } = useQuery<UserData>(GET_USER);

  const user = data?.getUser;

  const getUserInitials = (name?: string) => {
    const nameParts = name?.split(" ") || [];
    const first = nameParts[0]?.charAt(0) || "";
    const last = nameParts[nameParts.length - 1]?.charAt(0) || "";
    return (first + (nameParts.length > 1 ? last : "")).toUpperCase() || "U";
  };

  const handleModalSuccess = async () => {
    await refetch();
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.container}>
          <div>Carregando perfil...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.container}>
          <div>Erro ao carregar perfil do usuário</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileImageContainer}>
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Perfil"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                {getUserInitials(user.name)}
              </div>
            )}
            <button
              className={styles.editImageBtn}
              onClick={() => setShowEditModal(true)}
              title="Editar imagem"
            >
              ✏️
            </button>
          </div>

          <div className={styles.profileInfo}>
            <h1>{user.name}</h1>
            <p>{user.course ? `${user.course}` : "Curso não informado"}</p>
            <p>{user.university || "Universidade não informada"}</p>
            {user.bio && <p>{user.bio}</p>}

            <button
              className={styles.editProfileBtn}
              onClick={() => setShowEditModal(true)}
            >
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h2 className={styles.statNumber}>{user.volunteerHours}</h2>
            <p className={styles.statLabel}>Horas de Voluntariado</p>
          </div>
          <div className={styles.statCard}>
            <h2 className={styles.statNumber}>{user.projectsCompleted}</h2>
            <p className={styles.statLabel}>Projetos Concluídos</p>
          </div>
          <div className={styles.statCard}>
            <h2 className={styles.statNumber}>{user.donationsMade}</h2>
            <p className={styles.statLabel}>Doações Realizadas</p>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Competences Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Competências</h3>
            </div>
            <div className={styles.competencesGrid}>
              {user.competences && user.competences.length > 0 ? (
                user.competences.map((competence, index) => (
                  <span key={index} className={styles.competenceTag}>
                    {competence}
                  </span>
                ))
              ) : (
                <p className={styles.noOpportunities}>
                  Nenhuma competência adicionada. Clique em "Editar Perfil" para
                  adicionar suas habilidades.
                </p>
              )}
            </div>
          </div>

          {/* Opportunities Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                Histórico de Oportunidades
              </h3>
            </div>

            <div className={styles.tabContainer}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${
                    activeTab === "enrolled" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("enrolled")}
                >
                  Oportunidades Ativas
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "completed" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("completed")}
                >
                  Oportunidades Concluídas
                </button>
              </div>
            </div>

            <div className={styles.opportunityGrid}>
              {activeTab === "enrolled" ? (
                user.enrolledOpportunities &&
                user.enrolledOpportunities.length > 0 ? (
                  user.enrolledOpportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className={styles.opportunityCard}
                    >
                      <h4 className={styles.opportunityTitle}>
                        {opportunity.jobTitle}
                      </h4>
                      <p className={styles.opportunityCompany}>
                        {opportunity.company}
                      </p>
                      <div className={styles.opportunityMeta}>
                        <span>{opportunity.area}</span>
                        <span>{opportunity.duration}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noOpportunities}>
                    Você não está inscrito em nenhuma oportunidade no momento.
                  </p>
                )
              ) : user.completedOpportunities &&
                user.completedOpportunities.length > 0 ? (
                user.completedOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className={styles.opportunityCard}>
                    <h4 className={styles.opportunityTitle}>
                      {opportunity.jobTitle}
                    </h4>
                    <p className={styles.opportunityCompany}>
                      {opportunity.company}
                    </p>
                    <div className={styles.opportunityMeta}>
                      <span>{opportunity.area}</span>
                      <span>✓ Concluído</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noOpportunities}>
                  Você ainda não concluiu nenhuma oportunidade.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={user!}
          onSuccess={handleModalSuccess}
        />
      </div>
    </div>
  );
};
