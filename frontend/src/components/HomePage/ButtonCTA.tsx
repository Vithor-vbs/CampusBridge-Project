import styles from "./ButtonCTA.module.css";

type props = {
  text: string;
  linkTo?: string;
};

export const ButtonCTA = ({ text, linkTo }: props) => {
  return (
    <div className="button-cta-box">
      <a href={linkTo} type="submit" className={styles["button2"]}>
        {text}
      </a>
    </div>
  );
};
