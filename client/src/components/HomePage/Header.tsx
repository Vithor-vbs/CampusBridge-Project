import { Link } from "react-router-dom";
import uniShare from "../../assets/unishare-logo-header.svg";
import "./Header.css";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../GraphQL/Mutations";
import { GET_USER } from "../../GraphQL/Queries";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface UserData {
  getUser: User;
}

interface HeaderSectionProps {
  pageIndex: string;
}

export function Header(props: HeaderSectionProps) {
  const { data: userData } = useQuery<UserData>(GET_USER);
  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      window.location.href = "/login";
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const user = userData?.getUser;

  const logoutUser = () => {
    logout();
  };

  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    const first = nameParts[0]?.charAt(0) || "";
    const last = nameParts[nameParts.length - 1]?.charAt(0) || "";
    return (first + (nameParts.length > 1 ? last : "")).toUpperCase();
  };

  return (
    <section className="header-section sticky">
      <div className="header-container">
        <a className="home-redirect" href="/">
          <img
            className="header-main-image"
            src={uniShare}
            alt="CampusBridge agency name"
          />
        </a>

        <div className="header-properties-box">
          <a
            href="/Oportunidades"
            className={`properties-name ${
              props.pageIndex === "oportunidades" ? "pageIndex-modified" : ""
            }`}
          >
            Oportunidades
          </a>
          <a
            href="/#aboutUs"
            className={`properties-name ${
              props.pageIndex === "aboutUs" ? "pageIndex-modified" : ""
            }`}
          >
            Sobre nós
          </a>
          {/* <Link
            to="/Perfil"
            className={`properties-name ${
              props.pageIndex === "projects" ? "pageIndex-modified" : ""
            }`}
          >
            Perfil
          </Link> */}
          <div onClick={logoutUser} className="properties-name">
            Logout
          </div>
        </div>

        <div className="heeader-profile-box">
          <Link
            to="/contato"
            className={`properties-name ${
              props.pageIndex === "contato" ? "pageIndex-modified" : ""
            }`}
          >
            Contate-nos
          </Link>

          {user && (
            <>
              <div className="header-separator"></div>
              <Link to="/Perfil" className="profile-icon-link">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="profile-icon-image"
                  />
                ) : (
                  <div className="profile-icon-placeholder">
                    {getUserInitials(user.name)}
                  </div>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
