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

const periodArray = [
  {label: '1 день', id: 0},
  {label: '1 неделя', id: 1},
  {label: '1 месяц', id: 2},
  {label: '1 год', id: 3},
]

export const WorkEdit = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const onSubmitHandler = (event, params)=>{
    event.preventDefault();
    const {
          id,
          workName,
          category,
          description,
          oneTimeJob,
          period,
          firstWorkDate
      } = params;
  
  
    api.getPromise(`api/work/${id}/edit`, 'PUT', {
      "workName": workName,
      "category": category,
      "description": description,
      "oneTimeJob": oneTimeJob,
      "period": period,
      "firstWorkDate": firstWorkDate.format('YYYY-MM-DD'),
      "nextWorkDate": firstWorkDate.format('YYYY-MM-DD')
    })
      .then((result) => navigate(`/works/${id}`))
      .catch((error) => console.log("error", error));
  }
  const [workName, setWorkName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [oneTimeJob, setOneTimeJob] = useState('')
  const [period, setPeriod] = useState('')
  const [firstWorkDate, setFirstWorkDate] = useState('')
  let [nodes, setNodes] = useState([])

  useEffect(() => {
    api.getPromise(`api/type`, "GET")
      .then((result) => {
        setNodes(result.map((el)=>{return {
          label: el.name,
          id: el.id
        }}))
      
      })
      .catch((error) => console.log("error", error));
      
      api.getPromise(`api/work/${params.id}`, "GET")
      .then((result) => {
        setWorkName(result.name)
        setCategory(result.category)
        setDescription(result.description)
        setOneTimeJob(result.oneTimeJob)
        setPeriod(result.period)
        setFirstWorkDate(dayjs(result.firstWorkDate, "YYYY-MM-DD"))
      
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <form
      onSubmit={(event)=>{onSubmitHandler(event, {
        id: params.id,
        workName: workName,
        category: category,
        description: description,
        oneTimeJob: oneTimeJob,
        period: period,
        firstWorkDate: firstWorkDate
      })}}
      className={styles.createForm}
    >
      <TextField
        id="name"
        name="name"
        label="Наименование работы"
        variant="standard"
        value={workName}
        onChange={({ target }) => {
          setWorkName(target.value);
        }}
        required 
      />
      <Autocomplete
        disablePortal
        id="category"
        name="category"
        value={category}
        sx={{ width: '100%' }}
        onChange={(event, newValue) => {
          setCategory(newValue.label);
        }}
        options={nodes}
        renderInput={(params) => <TextField {...params} required label="Узел" />}
        required 
      />
      <div>
        <Typography>Описание работ</Typography>
        <TextareaAutosize minRows={15} maxRows={15} className={styles.textArea} name="description" required value={description} onChange={({ target }) => {
          setDescription(target.value);
        }}/>
        {/* <TextareaAutosize minRows={15} name="description" required /> */}
      </div>
      <FormControlLabel
        control={<Checkbox name="oneTimeJob" checked={Boolean(oneTimeJob)} onChange={el=>setOneTimeJob(el.target.checked)}/>}
        // control={<Checkbox name="oneTimeJob"/>}
        label="Разовая работа"
      />

      <Autocomplete
        disablePortal
        id="period"
        name="period"
        value={period}
        onChange={(event, newValue) => {
          setPeriod(newValue.label);
        }}
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
          value={firstWorkDate}
          onChange={(newValue) => {
        setFirstWorkDate(newValue)}}
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
        Сохранить
      </Button>
    </form>
  );
};
