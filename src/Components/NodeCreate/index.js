import React, { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";

import Autocomplete from "@mui/material/Autocomplete";

import styles from "./style.module.css";
import api from "../../utils/api.js";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";

const onSubmitHandler = (event)=>{
  event.preventDefault();
  const {name} = event.target

  api.getPromise(`api/type`, 'POST', {
    "name": name.value
  })
    .then((result) => console.log('Node added!'))
    .catch((error) => console.log("error", error));
}

export const NodeCreate = ({}) => {
  return (
    <form
      onSubmit={onSubmitHandler}
      className={styles.createForm}
    >
      <TextField
        id="name"
        name="name"
        label="Наименование узла"
        variant="standard"
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
