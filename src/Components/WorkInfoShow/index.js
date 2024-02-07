import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card as CardMUI } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base";
import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import styles from "./style.module.css";
import api from "../../utils/api.js";

import { Timeline } from "../Timeline";

export const WorkInfoShow = ({ workInfo }) => {
  const navigate = useNavigate();
  const deleteHandler = (id) =>{
    api.getPromise(`api/work/donework/${id}`, 'DELETE')
      .then((result) =>  {
        if (result.status === 200) {
          document.getElementById(`workInfo-${id}`).remove()
        }
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div
      style={{
        margin: "0 0 5px 10px",
      }}
      className={cn('sectionInner', styles.worksInfo)}
      id={`workInfo-${workInfo.id}`}
    >
      <div className={styles.workBlock}>

      
      <Typography variant="body2" color="text.secondary" noWrap>
        {<span style={{ fontWeight: "bold" }}>Наименование работ: </span>}
        {workInfo.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {
          <span style={{ fontWeight: "bold" }}>Плановая дата выполнения работ: </span>
        }
        {dayjs(workInfo.planWorkDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {
          <span style={{ fontWeight: "bold" }}>Фактическая дата выполнения работ: </span>
        }
        {dayjs(workInfo.factWorkDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {<span style={{ fontWeight: "bold" }}>Кто выполнял работы: </span>}
        {workInfo.whoDidWork}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {
          <span style={{ fontWeight: "bold" }}>Описание выполненных работ: </span>
        }
        {workInfo.description}
      </Typography>
      </div>
      <div>
      <IconButton color="primary" onClick = {()=>{navigate(`/works/donework/edit/${workInfo.id}`)}}>
        <EditIcon />
      </IconButton>
      <IconButton color="primary" onClick = {(one, two, three, four)=>{
        deleteHandler(workInfo.id)
        }}>
        <DeleteForeverIcon />
      </IconButton>
      </div>
    </div>
  );
};
