import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { PostCard } from "../PostCard";
import { WorkShow } from "../WorkShow";
import styles from "./style.module.css";
import cn from "classnames";
import { Pagination } from "../Pagination";
import api from "../../utils/api.js";
import { POSTSONPAGE } from "../../utils/config";
// import { GoBackButton } from "../GoBackButton";
// import PageContext from "../../contexts/PageContext";




import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


export const MashineTable = ({
  list,
  pagesCnt,
  user,
  login,
  setPagesCnt,
  setPostsState,
}) => {
//   const params = useParams();  
//   const { page, setPage, update, setFlag } = useContext(PageContext);
//   useEffect(() => {
//     if (login) {
//       if(update){
//         sliceList(page);
//         setFlag(false);
//       }
//     }
//   }, [page, login, update]);

//   const sliceList = (el) => {
//     api
//       .getPostsOnPage(el, POSTSONPAGE)
//       .then((data) => {
//         setPagesCnt(Math.ceil(data.total / POSTSONPAGE));
//         setPostsState(data.posts);
//         data.posts.forEach((el) => {
//           if (el.likes.includes(localStorage.getItem("userID"))) {
//             setFavorite((prevState) => [...prevState, el._id]);
//           }
//         });
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };

//   const tagSearch = (tag) => {
//     api
//       .getPosts()
//       .then((data) => {
//         // setPostsState(data.filter(el =>el.tags.includes(tag.trim()))) //поиск по тегу без учета пробелов в тегах

//         /*Поиск по тегам не зависимо от наличия пробелов в тегах*/
//         let postWithTag = [];
//         data.forEach((el) => {
//           el.tags.forEach((tagOnPost) => {
//             if (tagOnPost.trim() === tag.trim()) {
//               if (!postWithTag.includes(el)) {
//                 postWithTag.push(el);
//               }
//             }
//           });
//         });
//         setPostsState(postWithTag);
//         /*======================================================*/
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };

  return (
    <div className={cn("sectionInner", styles.cardListContainer)}>




        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
          </TreeItem>
          <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="8" label="index.js" onClick={()=>{console.log(123)}}/>
            </TreeItem>
          </TreeItem>
        </TreeView>





        <PostCard
                post={{
                    text: 'test text',
                    created_at: '2024-01-01',
                    updated_at: '2024-01-06'
                }}
              />

        <WorkShow />
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
