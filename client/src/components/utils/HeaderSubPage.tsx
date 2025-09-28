import styles from "./HeaderSubPage.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  item: string;
  breadcrumbs?: BreadcrumbItem[];
};

export const HeaderSubPage = ({ item, breadcrumbs }: Props) => {
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: "Home", path: "/" },
    { label: item },
  ];

  const currentBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-flex"]}>
        <h2>{item}</h2>
        <div className={styles["breadcrumb"]}>
          {currentBreadcrumbs.map((crumb, index) => (
            <span key={index} className={styles["breadcrumb-item"]}>
              {crumb.path ? (
                <Link to={crumb.path} className={styles["bold-link"]}>
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < currentBreadcrumbs.length - 1 && (
                <IoIosArrowForward size="12px" className={styles["arrow"]} />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
