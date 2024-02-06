import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";


import styles from "./style.module.css";
import api from "../../utils/api.js";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const WorkInfoCreate = ({}) => {
  const navigate = useNavigate();

const onSubmitHandler = (event, params) => {
  event.preventDefault();
  const workDone = new FormData();
  
  console.log('event',event)
  console.log('params',params)

  workDone.append("workId", params.workId);
  workDone.append("title", params.title);
  workDone.append("planWorkDate", params.planWorkDate);
  workDone.append("factWorkDate", params.factWorkDate);
  workDone.append("whoDidWork", params.whoDidWork);
  workDone.append("description", params.description);

  fetch("http://localhost:5000/api/work/donework", {
    method: "POST",
    body: workDone,
  })
  .then((response) => navigate(`/works/${params.workId}`))
  .catch((error) => console.log("error", error));
};

const params = useParams();

  const [work, setWork] = useState("");
  const [title, setTitle] = useState("");
  const [planWorkDate, setPlanWorkDate] = useState('');
  const [factWorkDate, setFactWorkDate] = useState(dayjs());
  const [whoDidWork, setWhoDidWork] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/work/${params.id}`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result); 
        setWork(res)
        setPlanWorkDate(res.nextWorkDate)
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <form onSubmit={(event)=>{onSubmitHandler(event, {
      workId: params.id,
      title: title,
      planWorkDate: planWorkDate,
      factWorkDate: factWorkDate.format('YYYY-MM-DD'),
      whoDidWork: whoDidWork,
      description: description
    })}}
      className={styles.createForm}
    >
      <TextField
        id="title"
        name="title"
        label="Наименование работ"
        variant="standard"
        value={title}
        onChange={({ target }) => {
          setTitle(target.value);
        }}
        required
      />
      <Typography variant="body2" color="text.secondary" noWrap sx={{marginBottom: '20px'}}>
        {
          <span style={{ fontWeight: "bold"}}>
            Плановая дата выполнения работ:{" "}
          </span>
        }
        {dayjs(planWorkDate, "YYYY-MM-DD").format("DD-MM-YYYY")}
      </Typography>

      <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
        <DatePicker
          name="factWorkDate"
          id="factWorkDate"
          value={factWorkDate}
          onChange={(newValue) => {
            console.log("newValue", newValue);
            setFactWorkDate(newValue);
          }}
          label="Фактическая дата выполнения работ"
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
      </LocalizationProvider>

      {/* <Autocomplete
        disablePortal
        id="whoDidWork"
        name="whoDidWork"
        value={whoDidWork}
        onChange={(event, newValue) => {
          setCategory(newValue);
        }}
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} required label="Кто выполнял работы" />}
        required 
      /> */}
      <TextField
        id="whoDidWork"
        name="whoDidWork"
        label="Кто выполнял работы"
        variant="standard"
        value={whoDidWork}
        onChange={({ target }) => {
          setWhoDidWork(target.value);
        }}
        required
      />

      <div>
        <Typography>Описание выполненных работ: </Typography>
        <TextareaAutosize
          minRows={15}
          maxRows={15}
          name="description"
          required
          value={description}
          className={styles.textArea}
          onChange={({ target }) => {
            setDescription(target.value);
          }}
        />
        {/* <TextareaAutosize minRows={15} name="description" required /> */}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        className="createBtn"
      >
        Подтвердить
      </Button>
    </form>
  );
};
