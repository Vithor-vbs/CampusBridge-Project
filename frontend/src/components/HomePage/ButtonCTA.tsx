import styles from "./ButtonCTA.module.css";

type props = {
  text: string;
};

export const ButtonCTA = ({ text }: props) => {
  return (
    <div className="button-cta-box">
      <button type="submit" className={styles["button2"]}>
        {text}
      </button>
    </div>
  );
};
