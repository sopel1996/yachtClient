"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MashineTableItem = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _styleModule = _interopRequireDefault(require("./style.module.css"));

var _classnames = _interopRequireDefault(require("classnames"));

var _api = _interopRequireDefault(require("../../utils/api.js"));

var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));

var _ChevronRight = _interopRequireDefault(require("@mui/icons-material/ChevronRight"));

var _TreeView = require("@mui/x-tree-view/TreeView");

var _TreeItem = require("@mui/x-tree-view/TreeItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { GoBackButton } from "../GoBackButton";
// import PageContext from "../../contexts/PageContext";
var MashineTableItem = function MashineTableItem(_ref) {
  var items = _ref.items;
  var result = []; // return items.map(item =>{
  //   console.log('item',toString(item.id))
  //   if (item.parent_id === null){
  //     if (item.is_leaf){
  //       return (<TreeItem nodeId={toString(item.id)} label={item.name} onClick={(one, two, three)=>{
  //       }}/>)
  //     } else {
  //       return ( <TreeItem nodeId={item.id.toString()} label={item.name} onClick={(event)=>{
  //           if (Array.from(event.target.classList).find(el=> el === 'MuiTreeItem-label')){
  //             console.log('label')
  //           } else {
  //             console.log('expander')
  //           }
  //         }}>
  //         <TreeItem nodeId="8" label="index.js" />
  //       </TreeItem>)
  //     }
  //   }  
  // })
};

exports.MashineTableItem = MashineTableItem;