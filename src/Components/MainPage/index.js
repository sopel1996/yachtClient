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
  console.log(process.env.API_URL);
  // fetch(`http://localhost:5000/api/type`).then((res)=>{return res.json()}).then((res)=>{console.log(res)});
return (
    <div className={cn("sectionInner", styles.mainPage)}>
        <div className={cn("sectionINner", styles.treeMenu)}>
        
          </div>
          <div className={cn("sectionInner", styles.mainContent)}>
            <MainContent />
          </div>
    </div>

//       <HeaderLine />
//       {Object.keys(params).length ? (
//         <>
//           <div className={cn(styles.gridTable)}>
//             {list?.map((item) => (
//               <PostCard
//                 post={item}
//                 key={item._id}
//                 isInFavorite={favorite.includes(item._id)}
//                 setFavorite={setFavorite}
//                 user={user}
//                 setPostsState={setPostsState}
//                 setPagesCnt={setPagesCnt}
//                 tagSearch={tagSearch}
//               />
//             ))}
//           </div>
//           <GoBackButton />
//         </>
//       ) : (
//         <>
//           <div className={cn(styles.gridTable)}>
//             {list?.map((item) => (
//               <PostCard
//                 post={item}
//                 key={item._id}
//                 isInFavorite={favorite.includes(item._id)}
//                 setFavorite={setFavorite}
//                 user={user}
//                 setPostsState={setPostsState}
//                 setPagesCnt={setPagesCnt}
//                 tagSearch={tagSearch}
//               />
//             ))}
//           </div>

//           <Pagination pagesCnt={pagesCnt} />
//         </>
//       )}
    // </div>
  );
};
