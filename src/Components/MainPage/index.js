import styles from "./style.module.css";
import cn from "classnames";
import { MainContent } from "../MainContent";

export const MainPage = ({}) => {
  return (
    <div className={cn("sectionInner", styles.mainPage)}>
      <div className={cn("sectionInner", styles.mainContent)}>
        <MainContent />
      </div>
    </div>
  );
};
