import styles from "./HeaderSubPage.module.css";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  item: String;
};

export const HeaderSubPage = ({ item }: Props) => {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-flex"]}>
        <h2>{item}</h2>
        <p>
          <a href="/" className={styles["bold-link"]}>
            Home
          </a>
          <IoIosArrowForward size="12px" />
          <span>{item}</span>
        </p>
      </div>
    </div>
  );
};
