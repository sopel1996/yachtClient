import { TreeItem } from "@mui/x-tree-view/TreeItem";

export const MashineTableItem = ({ items }) => {
  let result = [];

  const renderTree = (nodes) => {
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };
  return items.map((item) => renderTree(item));
};
