import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card as CardMUI } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TextareaAutosize } from '@mui/base';
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PostCard } from "../PostCard";
import { WorkCreate } from "../WorkCreate";
import { WorkLineShow } from "../WorkLineShow";

import styles from "./style.module.css";
import api from "../../utils/api.js";

import { Timeline } from "../Timeline";
// import PageContext from "../../contexts/PageContext";
import * as dayjs from 'dayjs'
import 'dayjs/locale/ru' // import locale

export const MainContent = ({
}) => {     

  require("dayjs/locale/ru");
  
  console.log(dayjs('2024-02-01T12:23', 'YYYY-MM-DD').format('DD-MM-YYYY'))
  const [overdueWorks, setOverdueWorks] = useState([])
  const [upcomingWorks, setUpcomingWorks] = useState([])
  
  useEffect(()=>{
    fetch(`${process.env.API_LINK}api/work/getAllWithParams?today=${dayjs().format('YYYY-MM-DD')}`, {
      method: "GET",
      
    })
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result)
        console.log(res)
        setOverdueWorks(res.overdueWorks)
        setUpcomingWorks(res.upcomingWorks)
      })
      .catch((error) => console.log("error", error));
  },[])

  console.log(dayjs().format('YYYY-MM-DD'))

  return (
    <div className={cn('sectionInner', styles.grid)}>
      <div>
      <Typography variant="h5" color="text.primary" noWrap>
          Просроченные работы: {overdueWorks.length}
      </Typography>
        <div  className={styles.scroll}>
          {overdueWorks.map( el=><WorkLineShow work={el}/> )}
        </div>

      </div>
      <div>
      <Typography variant="h5" color="text.primary" noWrap>
        Предстоящие работы: {upcomingWorks.length}
      </Typography>
        <div  className={styles.scroll}>
          {upcomingWorks.map( el=><WorkLineShow work={el}/> )}
        </div>
      </div>
    </div>
  );
};
