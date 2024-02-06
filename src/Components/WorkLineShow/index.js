import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";

import styles from "./style.module.css";
import api from "../../utils/api.js";

import { WorkInfoShow } from "../WorkInfoShow";

export const WorkLineShow = ({work}) => {
  const navigate = useNavigate();
  // require("dayjs/locale/ru");
  return (
        <Card sx={{ width: 410 , margin: '0 0 30px 0'}} onClick = {()=>{navigate(`/works/${work.id}`)}} className={styles.cursorPointer}>
          <CardHeader
            title={work.name}
            subheader={"Дата выполнения следующей работы: " + dayjs(work.nextWorkDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
          />
            <Typography sx={{ mb: 1.5 }} color="text.secondary" className={styles.padding}>
              {work.category}
            </Typography>
        </Card>
  );
};
