import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";

import styles from "./style.module.css";
import api from "../../utils/api.js";

import { WorkInfoShow } from "../WorkInfoShow";

export const WorkShow = ({work, withWorks}) => {
  const navigate = useNavigate();
  
  const deleteHandler = (id) =>{
   console.log(id)
    fetch(`http://localhost:5000/api/work/${id}`, {
      method: "DELETE",
    })
      .then((response) =>  {navigate('/works')})
      .catch((error) => console.log("error", error));
  }

  // require("dayjs/locale/ru");
  return (
        <Card sx={{maxHeight: withWorks ? 'auto' : '600px'}} className={cn('sectionInner', styles.flex)}>
          <CardHeader
            title={work.name}
            subheader={"Дата выполнения следующей работы: " + dayjs(work.nextWorkDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
          />
          <CardContent className={styles.flexGrow}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {work.category}
            </Typography>
            <Typography variant="body2" className={withWorks ? null : styles.textOverflow}>
              {"Описание работы: " + work.description}
            </Typography>
            {work.oneTimeJob ? (
              <Typography variant="body2">
                {"Дата выполнения разовой работы: " + dayjs(work.nextWorkDate, "YYYY-MM-DD").format('DD-MM-YYYY')}
              </Typography>
            ) : (
              <Typography variant="body2">
                {"Первиод выполнения работ: " + work.period}
              </Typography>
            )}
            {withWorks && <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Выполненные работы:
              <IconButton color="primary" onClick = {()=>{navigate(`/works/donework/create/${work.id}`)}}>
              <AddIcon />
            </IconButton>
            </Typography>}
            {withWorks &&  <div
              style={{
                maxHeight: "400px",
                overflow: "hidden",
                overflowY: "scroll",
                padding: '10px 20px 10px 10px'
              }}
            >
              {work.info.map((el) => <WorkInfoShow workInfo={el} key={uuidv4()}/>)}
            </div>}
          </CardContent>

          {withWorks 
          ? <CardActions className={styles.padding}>
            <Button variant="contained" size="small"
             onClick = {()=>{navigate(`/works/edit/${work.id}`)}}
             >
              Редактировать
            </Button>
            <Button variant="outlined" size="small"
            onClick = {()=>{deleteHandler(work.id)}}
            >
              Удалить
            </Button>
          </CardActions>
          : <CardActions className={styles.padding}>
          <Button variant="contained" size="small" 
          onClick = {()=>{navigate(`/works/${work.id}`)}}>
            Открыть работу
          </Button>
        </CardActions>
          }
        </Card>
  );
};
