import "./OpportunitiesContent.css";
import sampleImage from "../../assets/image-example.png";
import { BsArrowRightShort } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";

export const OpportunitiesContent = () => {
  // const pageSize = 10;
  const sampleOpportunities = [
    {
      id: 1,
      company: "Vortex",
      jobTitle: "Desenvolvedor de Software na Mdiasbranco",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      duration: "4 meses",
    },
    {
      id: 2,
      company: "Coral&co.",
      jobTitle: "Desenvolvedor de Software",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      duration: "4 meses",
    },
    {
      id: 3,
      company: "Dtec",
      jobTitle: "Desenvolvedor de Software",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      duration: "4 meses",
    },
    {
      id: 4,
      company: "Amaro",
      jobTitle: "Desenvolvedor de Software",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      duration: "4 meses",
    },
    {
      id: 5,
      company: "Vortex",
      jobTitle: "Desenvolvedor de Software",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      duration: "4 meses",
      // },
      // {
      //   id: 6,
      //   company: "Coral&co.",
      //   jobTitle: "Desenvolvedor de Software",
      //   description:
      //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      //   duration: "4 meses",
      // },
      // {
      //   id: 7,
      //   company: "Dtec",
      //   jobTitle: "Desenvolvedor de Software",
      //   description:
      //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",
      //   duration: "4 meses",
      // },
      // {
      //   id: 8,
      //   company: "Amaro",
      //   jobTitle: "Desenvolvedor de Software",
      //   description:
      //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit quaerat ea. Eum numquam eius tenetur dicta incidunt sunt quo earum. Amet sapiente perspiciatis aspernatur. Obcaecati, nobis? Totam, qui excepturi.",

      //   duration: "4 meses",
    },
  ];
  return (
    <section className="op-content-section">
      <div className="op-content-box">
        {sampleOpportunities.map((opportunity) => (
          <div className="op-item-box" key={opportunity.id}>
            <h2>{opportunity.jobTitle}</h2>
            <img src={sampleImage} alt="" />
            <p className="op-content-description">{opportunity.description}</p>
            <div className="op-content-bottom">
              <a href="/oportunidades" className="properties-name op-adjust">
                <span>mostrar mais</span> <BsArrowRightShort size="1.5rem" />
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
            <li>
              <span>Engenharia de software</span> <p>2</p>
            </li>
            <li>
              <span>Design</span> <p>1</p>
            </li>
            <li>
              <span>Arquitetura</span> <p>4</p>
            </li>
            <li>
              <span>Marketing</span> <p>5</p>
            </li>
            <li>
              <span>TI</span> <p>14</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
