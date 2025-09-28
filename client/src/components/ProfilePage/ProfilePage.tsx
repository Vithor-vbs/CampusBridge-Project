import { ProfileContent } from "./ProfileContent";
import { Header } from "../HomePage/Header";
import { HeaderSubPage } from "../utils/HeaderSubPage";
import { Footer } from "../HomePage/Footer";

export const ProfilePage = () => {
  return (
    <section style={{ marginTop: "6rem" }}>
      <Header pageIndex="perfil" />
      <HeaderSubPage item={"Perfil"} />
      <ProfileContent />
      <Footer />
    </section>
  );
};
