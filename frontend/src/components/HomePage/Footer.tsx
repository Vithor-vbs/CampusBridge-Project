import campusBridgeWhiteLogo from "../../assets/white-name-logo.png";
import "./Footer.css";

export function Footer() {
    return (
        <section className="footer-section">
            <div className="grid">
                <div className="logo">
                    <a className="home-redirect" href="/">
                        <img
                            className="header-main-image"
                            src={campusBridgeWhiteLogo}
                            alt="CampusBridge agency name"
                        />
                    </a>
                </div>
                <h4>Links</h4>
                <h4>Help</h4>                
            </div>
            <div className="grid">
                <p>Av. Washington Soares, 1321 - Edson Queiroz, Fortaleza - CE, 60811-905</p>
                <p>Home</p>
                <p>Politicas de Privacidade</p>
            </div>
            <div className="grid">
                <div className="blanc"></div>
                <p>Oportunidades</p>
                <a href="https://www.unifor.br/">Acesse a Unifor</a>
            </div>
            <div className="grid">
                <div className="blanc"></div>
                <p>Sobre</p>
            </div>
            <div className="grid">
                <div className="blanc"></div>
                <p>Contato</p>
            </div>
            <hr />
            <p className="allRights">2023 CampusBridge. All rights reverved</p>
        </section>
    )
};