import styles from "./ButtonCTA.module.css";

type props = {
  text: string;
  linkTo?: string;
  action?: () => void;
};

export const ButtonCTA = ({ text, linkTo, action }: props) => {
  return (
    <div onClick={action} className="button-cta-box">
      <a href={linkTo} type="submit" className={styles["button2"]}>
        {text}
      </a>
    </div>
  );
};
