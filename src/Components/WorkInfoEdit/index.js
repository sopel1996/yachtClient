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

import Autocomplete from "@mui/material/Autocomplete";

import styles from "./style.module.css";
import api from "../../utils/api.js";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const WorkInfoEdit = ({}) => {
  const params = useParams();
 const navigate = useNavigate();
  const onSubmitHandler = (event, params) => {
    event.preventDefault();
    const {
        id,
        title,
        factWorkDate,
        whoDidWork,
        description,
      } = params;

    api.getPromise(`api/work/donework/${id}/edit`, "PUT", {
      "title": title,
      "factWorkDate": factWorkDate,
      "whoDidWork": whoDidWork,
      "description": description
    })

      .then((result) => navigate(`/works/${result}`))
      .catch((error) => console.log("error", error));
  };

  const [title, setTitle] = useState("");
  const [planWorkDate, setPlanWorkDate] = useState("");
  const [factWorkDate, setFactWorkDate] = useState("");
  const [whoDidWork, setWhoDidWork] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    api.getPromise(`api/work/donework/${params.id}`, "GET")
      .then((result) => {
        setTitle(result.title);
        setPlanWorkDate(result.planWorkDate);
        setFactWorkDate(dayjs(result.factWorkDate, "YYYY-MM-DD"));
        setWhoDidWork(result.whoDidWork);
        setDescription(result.description);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <form
      onSubmit={(event) => {
    event.preventDefault();
        onSubmitHandler(event, {
          id: params.id,
          title: title,
          factWorkDate: factWorkDate,
          whoDidWork: whoDidWork,
          description: description,
        });
      }}
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
      <Typography
        variant="body2"
        color="text.secondary"
        noWrap
        sx={{ marginBottom: "20px" }}
      >
        {
          <span style={{ fontWeight: "bold" }}>
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
          className={styles.textArea}
          name="description"
          required
          value={description}
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
        Сохранить
      </Button>
    </form>
  );
};
