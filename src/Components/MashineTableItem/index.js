
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import styles from "./style.module.css";
import cn from "classnames";
import api from "../../utils/api.js";
// import { GoBackButton } from "../GoBackButton";
// import PageContext from "../../contexts/PageContext";




import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


export const MashineTableItem = ({
  items
}) => {
  let result = []
  
  const renderTree = (nodes) => {
    console.log(nodes)

    return (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )};
  console.log('items',items)
  return items.map(item=>renderTree(item))
};
