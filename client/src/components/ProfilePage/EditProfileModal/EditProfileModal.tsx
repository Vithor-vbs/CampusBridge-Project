import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../../GraphQL/Mutations";
import styles from "../ProfilePage.module.css";
import { compressImage, validateImageFile } from "../../../utils/imageUtils";

interface User {
  _id: string;
  email: string;
  name: string;
  profileImage?: string;
  bio?: string;
  university?: string;
  course?: string;
  competences: string[];
  enrolledOpportunities: any[];
  completedOpportunities: any[];
  volunteerHours: number;
  projectsCompleted: number;
  donationsMade: number;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSuccess: () => void;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  onSuccess,
}: EditProfileModalProps) => {
  const [newCompetence, setNewCompetence] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    university: "",
    course: "",
    profileImage: "",
    competences: [] as string[],
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  // Initialize form when user data loads
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        bio: user.bio || "",
        university: user.university || "",
        course: user.course || "",
        profileImage: user.profileImage || "",
        competences: user.competences || [],
      });
    }
  }, [user]);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleUpdateProfile = async () => {
    try {
      console.log("Updating profile with data:", editForm);

      const result = await updateProfile({
        variables: {
          name: editForm.name,
          profileImage: editForm.profileImage,
          bio: editForm.bio,
          university: editForm.university,
          course: editForm.course,
          competences: editForm.competences || [],
        },
      });

      console.log("Profile update result:", result);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Error will be logged in console, no alert needed
    }
  };

  const addCompetence = () => {
    if (
      newCompetence.trim() &&
      !editForm.competences.includes(newCompetence.trim())
    ) {
      setEditForm({
        ...editForm,
        competences: [...editForm.competences, newCompetence.trim()],
      });
      setNewCompetence("");
    }
  };

  const removeCompetence = (competenceToRemove: string) => {
    setEditForm({
      ...editForm,
      competences: editForm.competences.filter(
        (comp) => comp !== competenceToRemove
      ),
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && validateImageFile(file)) {
      try {
        // Compress the image before uploading
        const compressedImage = await compressImage(file, 400, 0.8);
        setEditForm({
          ...editForm,
          profileImage: compressedImage,
        });
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
        // Error logged in console, no alert needed
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Editar Perfil</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome:</label>
            <input
              type="text"
              className={styles.input}
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Universidade:</label>
            <input
              type="text"
              className={styles.input}
              value={editForm.university}
              onChange={(e) =>
                setEditForm({ ...editForm, university: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Curso:</label>
            <input
              type="text"
              className={styles.input}
              value={editForm.course}
              onChange={(e) =>
                setEditForm({ ...editForm, course: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio:</label>
            <textarea
              className={styles.textarea}
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              placeholder="Conte um pouco sobre você..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Imagem de Perfil:</label>

            {/* Preview da imagem atual */}
            {editForm.profileImage && (
              <div className={styles.imagePreview}>
                <img
                  src={editForm.profileImage}
                  alt="Preview"
                  className={styles.previewImage}
                />
              </div>
            )}

            {/* Botões de upload */}
            <div className={styles.imageUploadButtons}>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={triggerFileUpload}
              >
                📁 Escolher Arquivo
              </button>

              <span className={styles.orDivider}>ou</span>

              <input
                type="url"
                className={styles.urlInput}
                value={
                  editForm.profileImage.startsWith("data:")
                    ? ""
                    : editForm.profileImage
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profileImage: e.target.value,
                  })
                }
                placeholder="Cole uma URL de imagem"
              />
            </div>

            {/* Input oculto para file upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Competências:</label>
            <div className={styles.competencesGrid}>
              {editForm.competences.map((competence, index) => (
                <span key={index} className={styles.competenceTag}>
                  {competence}
                  <button
                    type="button"
                    className={styles.removeCompetence}
                    onClick={() => removeCompetence(competence)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className={styles.addCompetenceForm}>
              <input
                type="text"
                className={styles.competenceInput}
                value={newCompetence}
                onChange={(e) => setNewCompetence(e.target.value)}
                placeholder="Adicionar nova competência..."
                onKeyPress={(e) => e.key === "Enter" && addCompetence()}
              />
              <button
                type="button"
                className={styles.addBtn}
                onClick={addCompetence}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.saveBtn} onClick={handleUpdateProfile}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
