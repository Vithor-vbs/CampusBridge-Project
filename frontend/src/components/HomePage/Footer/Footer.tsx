import campusBridgeWhiteLogo from "../../../assets/CampusBridge-vectorized.svg";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <section className={styles["footer-section"]}>
      <div className={styles.grid}>
        <div>
          <a href="/">
            <img
              className={styles["header-main-image"]}
              src={campusBridgeWhiteLogo}
              alt="CampusBridge agency name"
            />
          </a>
        </div>
        <h4>Links</h4>
        <h4>Help</h4>
      </div>
      <div className={styles.grid}>
        <p className={styles["address"]}>
          Av. Washington Soares, 1321 - Edson Queiroz, Fortaleza - CE, 60811-905
        </p>
        <a href="/">Home</a>
        <a>Politicas de Privacidade</a>
      </div>
      <div className={styles.grid}>
        <div className={styles.blanc}></div>
        <a>Oportunidades</a>
        <a href="https://www.unifor.br/">Acesse a Unifor</a>
      </div>
      <div className={styles.grid}>
        <div className={styles.blanc}></div>
        <a href="/#aboutUs">Sobre</a>
      </div>
      <div className={styles.grid}>
        <div></div>
        <a>Contato</a>
      </div>
      <p className={styles["allrights"]}>
        2023 CampusBridge. All rights reverved
      </p>
    </section>
  );
}
