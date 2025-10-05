import type React from "react"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import "./CreateDonationModal.css"
import type { DonationFormData } from "../../types"

interface CreateDonationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (donationData: DonationFormData) => void
}

export const CreateDonationModal = ({ isOpen, onClose, onSubmit }: CreateDonationModalProps) => {
  const [formData, setFormData] = useState<DonationFormData>({
    jobTitle: "",
    company: "",
    description: "",
    area: "",
    duration: "",
    tags: "",
    image: "",
    amount: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === "amount" ? Number(e.target.value) : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        ...formData,
        type: "doação",
      })
    }
    
    setFormData({
      jobTitle: "",
      company: "",
      description: "",
      area: "",
      duration: "",
      tags: "",
      image: "",
      amount: 1,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Criar Nova Doação</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="jobTitle">Título da Doação *</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Ex: Livro de Matemática"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Doador/Organização *</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Ex: João Silva ou ONG Educação"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">Categoria *</label>
            <select id="area" name="area" value={formData.area} onChange={handleChange} required>
              <option value="">Selecione uma categoria</option>
              <option value="Educação">Educação</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Vestuário">Vestuário</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Móveis">Móveis</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva o item que você está doando..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Disponível por quanto tempo? *</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ex: 30 dias, 2 meses, etc."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Quantidade *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              placeholder="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (separadas por vírgula)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Ex: livro, matemática, ensino médio"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL da Imagem (opcional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Publicar Doação
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
