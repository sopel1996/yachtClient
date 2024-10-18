import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import styles from "./style.module.css";
import cn from "classnames";
import api from "../../utils/api.js";
import { MashineTableItem } from "../MashineTableItem";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


// Функция для построения дерева
function buildTree(data, parentId = null) {
  const tree = [];

  for (const item of data) {
      if (item.parent_id === parentId) {
          const children = buildTree(data, item.id);
          if (children.length > 0) {
              item.children = children;
          }
          tree.push(item);
      }
  }

  return tree;
}

export const MashineTable = ({
}) => {
  let [types, setTypes] = useState([]);
  useEffect(() => {
    api
      .getPromise(`api/type/getCategoryList`, "GET")
      .then((result) => {
        setTypes(buildTree(result));
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div className={cn("sectionInner", styles.cardListContainer)}>
        {/* <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
              <MashineTableItem items={types} />
      </TreeView> */}

<TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={function(){console.log('qweqwe')}}
      choldren={<MashineTableItem/>}
      sx={{ height: 200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {/* <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem> */}
      <MashineTableItem items={types} />
    </TreeView>


    </div>
  );
};
