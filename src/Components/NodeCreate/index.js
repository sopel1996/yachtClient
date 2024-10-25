import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./style.module.css";
import api from "../../utils/api.js";

import "dayjs/locale/ru";

const onSubmitHandler = (event, nodes) => {
  event.preventDefault();
  const { name, parentName } = event.target;
  let parentId = nodes.find((el) => el.label === parentName.value);
  api
    .getPromise(`api/type`, "POST", {
      name: name.value,
      parent_id: parentId.id,
    })
    .then((result) => console.log("Node added!"))
    .catch((error) => console.log("error", error));
};

export const NodeCreate = ({}) => {
  let [nodes, setNodes] = useState([]);
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

  return (
    <form
      onSubmit={(evt) => {
        onSubmitHandler(evt, nodes);
      }}
      className={styles.createForm}
    >
      <TextField
        id="name"
        name="name"
        label="Наименование узла"
        variant="standard"
        required
      />
      <Autocomplete
        disablePortal
        id="parentName"
        name="parentName"
        options={nodes}
        sx={{ width: "100%" }}
        renderInput={(params) => {
          console.log("params", params);
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
        создать
      </Button>
    </form>
  );
};
