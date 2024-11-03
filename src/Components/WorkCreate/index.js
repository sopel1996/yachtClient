import React, { useState, useContext, useEffect } from "react";

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

const periodArray = [
  { label: "1 день", id: 0 },
  { label: "1 неделя", id: 1 },
  { label: "1 месяц", id: 2 },
  { label: "1 год", id: 3 },
];

const onSubmitHandler = (event,selectedOption) => {
  event.preventDefault();
  const {
    target: { name, category, description, oneTimeJob, period, firstWorkDate },
  } = event;


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = {
    name: name.value,
    category: category.value,
    description: description.value,
    oneTimeJob: oneTimeJob.checked,
    period: period.value,
    firstWorkDate: dayjs(firstWorkDate.value, "DD.MM.YYYY").format(
      "YYYY-MM-DD"
    ),
    nextWorkDate: dayjs(firstWorkDate.value, "DD.MM.YYYY").format("YYYY-MM-DD"),
    typeId: selectedOption.id
  };

  api
    .getPromise("api/work", "POST", raw)
    .then((result) => console.log("work added!"));
};

export const WorkCreate = ({}) => {
  let [nodes, setNodes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

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
    <form onSubmit={(e)=>onSubmitHandler(e, selectedOption)} className={styles.createForm}>
      <TextField
        id="name"
        name="name"
        label="Наименование работы"
        variant="standard"
        required
      />
      <Autocomplete
        disablePortal
        id="category"
        name="category"
        options={nodes}
        sx={{ width: "100%" }}
        onChange={(event, newValue) => {
          setSelectedOption(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} required label="Узел" />
        )}
        required
      />
      <div>
        <Typography>Описание работ</Typography>
        <TextareaAutosize
          minRows={15}
          maxRows={15}
          name="description"
          className={styles.textArea}
          required
        />
      </div>
      <FormControlLabel
        control={<Checkbox name="oneTimeJob" />}
        label="Разовая работа"
      />

      <Autocomplete
        disablePortal
        id="period"
        name="period"
        options={periodArray}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} required label="Период выолнения работ" />
        )}
      />
      <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
        <DatePicker
          name="firstWorkDate"
          id="firstWorkDate"
          label="Дата выполнения первой работы"
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
      </LocalizationProvider>

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
