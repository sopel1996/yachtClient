import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./style.module.css";
import api from "../../utils/api.js";
import { useParams } from "react-router-dom";

import "dayjs/locale/ru";

const onSubmitHandler = (event, id, nodeName, parentNode) => {
  event.preventDefault();
 
  api
    .getPromise(`api/type/${id}/edit`, "PUT", {
      name: nodeName,
      parent_id: parentNode?.id || null,
    })
    .then((result) => console.log("Node edited!"))
    .catch((error) => console.log("error", error));
};

export const NodeEdit = ({}) => {
  const params = useParams();
  let [nodes, setNodes] = useState([]);
  let [nodeName, setNodeName] = useState([]);
  let [parentNode, setParentNode] = useState([]);
  useEffect(() => {
    api
      .getPromise(`api/type`, "GET")
      .then((result) => {
        setNodes(
          result.map((el) => {
            return {
              label: el.name,
              id: el.id,
            };
          })
        );
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    api
    .getPromise(`api/type/${params.id}`, "GET")
    .then((result) => {
      console.log(result)
      console.log(nodes)
      let parentNode = nodes.find((el) => el.id === result.parent_id)
      setNodeName(result.name)
      console.log('parentNode',parentNode)
      setParentNode(parentNode)
    })
    .catch((error) => console.log("error", error));
  }, [nodes]);

  return (
    <form
      onSubmit={(evt) => {
        onSubmitHandler(evt, params.id, nodeName, parentNode);
      }}
      className={styles.createForm}
    >
      <TextField
        id="name"
        name="name"
        label="Наименование узла"
        variant="standard"
        required
        value={nodeName}
        onChange={({ target }) => {
          setNodeName(target.value);
        }}
      />
      <Autocomplete
        disablePortal
        id="parentName"
        name="parentName"
        options={nodes}
        sx={{ width: "100%" }}
        value={parentNode}
        onChange={(event, newValue) => {
          setParentNode(newValue);
        }}
        renderInput={(params) => {
          return <TextField {...params} label="Родительский узел" />;
        }}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        className="createBtn"
      >
        Сохранить
      </Button>
    </form>
  );
};
