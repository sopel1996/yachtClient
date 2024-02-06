import React from "react";
import "regenerator-runtime/runtime";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MashineTable } from "./Components/MashineTable";
import { MainPage } from "./Components/MainPage";
import { Header } from "./Components/Header";
import { Logo } from "./Components/Logo";
import { Menu } from "./Components/Menu";
import { WorkPage } from "./Components/WorkPage";
import { WorksListPage } from "./Components/WorksListPage";
import { WorkEdit } from "./Components/WorkEdit";
import { WorkInfoEdit } from "./Components/WorkInfoEdit";
import { WorkCreate } from "./Components/WorkCreate";
import { WorkInfoCreate } from "./Components/WorkInfoCreate";
import { NodeCreate } from "./Components/NodeCreate";



import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import cn from "classnames";

import "babel-polyfill";
import "normalize.css";
import "./App.css";

export const App = () => {
  return (
    <div className="">
      <Header>
        <Logo />
        <Menu />
      </Header>
      <div className={cn("sectionInner", 'flex')}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, minWidth: 210, maxWidth: 300, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
          </TreeItem>
          <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="MUI">
              <TreeItem
                nodeId="8"
                label="index.js"
                onClick={() => {
                  console.log(123);
                }}
              />
            </TreeItem>
          </TreeItem>
        </TreeView>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/works/:id" element={<WorkPage />} />
          <Route path="/works" element={<WorksListPage />} />
          <Route path="/works/create" element={<WorkCreate />} />
          <Route path="/works/edit/:id" element={<WorkEdit />} />
          <Route path="/works/donework/create/:id" element={<WorkInfoCreate />} />
          <Route path="/works/donework/edit/:id" element={<WorkInfoEdit />} />
          <Route path="/node/create" element={<NodeCreate />} />
        </Routes>
      </div>
    </div>
  );
};
