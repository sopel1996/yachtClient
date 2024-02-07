import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { PostCard } from "../PostCard";
import { WorkShow } from "../WorkShow";
import styles from "./style.module.css";
import cn from "classnames";
import { Pagination } from "../Pagination";
import { MainContent } from "../MainContent";
import api from "../../utils/api.js";
import { POSTSONPAGE } from "../../utils/config";
// import { GoBackButton } from "../GoBackButton";
// import PageContext from "../../contexts/PageContext";




import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


export const MainPage = ({
}) => {
return (
    <div className={cn("sectionInner", styles.mainPage)}>
        <div className={cn("sectionINner", styles.treeMenu)}>
          </div>
          <div className={cn("sectionInner", styles.mainContent)}>
            <MainContent />
          </div>
    </div>
  );
};
