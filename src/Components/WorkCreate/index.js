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
  {label: '1 день', id: 0},
  {label: '1 неделя', id: 1},
  {label: '1 месяц', id: 2},
  {label: '1 год', id: 3},
]

const onSubmitHandler = (event)=>{
  event.preventDefault();
  const {
      target: {
        name,
        category,
        description,
        oneTimeJob,
        period,
        firstWorkDate,
      },
    } = event,
    newFirstWorkDate = `${firstWorkDate.value.split(".")[2]}-${firstWorkDate.value.split(".")[1]}-${firstWorkDate.value.split(".")[0]}`,
    work = new FormData(),
    date = new Date(newFirstWorkDate);
    let nextWorkDate;

  work.append("name", name.value);
  work.append("category", category.value);
  work.append("description", description.value);
  work.append("oneTimeJob", oneTimeJob.checked);
  work.append("period", period.value);
  work.append("firstWorkDate", newFirstWorkDate);
  work.append("nextWorkDate", newFirstWorkDate);

  fetch("http://localhost:5000/api/work", {
    method: "POST",
    
    body: work,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export const WorkCreate = ({}) => {
  let [nodes, setNodes] = useState([])
  useEffect(()=>{
    fetch(`http://localhost:5000/api/type`, {
      method: "GET",
      
    })
      .then((response) => response.text())
      .then((result) => {
        const array = JSON.parse(result) 
        setNodes(array.map((el)=>{return {
          label: el.name,
          id: el.id
        }}))
      })
      .catch((error) => console.log("error", error));
  },[])
  return (
    <form
      onSubmit={onSubmitHandler}
      className={styles.createForm}
    >
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
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} required label="Узел" />}
        required 
      />
      <div>
        <Typography>Описание работ</Typography>
        <TextareaAutosize minRows={15} maxRows={15} name="description" className={styles.textArea} required/>
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
        sx={{ width: '100%' }}
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
