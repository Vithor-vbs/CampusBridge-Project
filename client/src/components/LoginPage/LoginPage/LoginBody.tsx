// import React, { useState } from "react";
// import styles from "./LoginBody.module.css";
// import { ButtonCTA } from "../../HomePage/ButtonCTA";
// import campusbridgeLogo from "../../../assets/CampusBridge-vectorized.svg";
// import { useMutation } from "@apollo/client";
// import { LOGIN } from "../../../GraphQL/Mutations";

// interface FormProps {}

// export const LoginBody: React.FC<FormProps> = () => {
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };

//   const [login, { error }] = useMutation(LOGIN);

//   const loginUser = () => {
//     login({
//       variables: {
//         email: email,
//         password: pwd,
//       },
//     });

//     if (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <section className={styles["form-container-box"]}>
//       <div className={styles["form-container"]}>
//         <img src={campusbridgeLogo} alt="agency name and logo" />
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles["form-group"]}>
//             <label htmlFor="email">Email</label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               required
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//           </div>
//           <div className={styles["form-group"]}>
//             <label htmlFor="email">Senha</label>
//             <input
//               type="password"
//               id="Senha"
//               name="Senha"
//               required
//               onChange={(e) => {
//                 setPwd(e.target.value);
//               }}
//             />
//           </div>
//           <div className={styles["cta-login-box"]}>
//             <ButtonCTA linkTo={"/home"} text={"Entrar"} action={loginUser} />
//             <a href="/registro">Não tem conta? Registre-se aqui</a>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };
