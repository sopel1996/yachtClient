import React, { useState, useContext, useEffect } from "react";

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

import { WorkShow } from "../WorkShow";

export const WorksListPage = () => {
  const [works, setWorks] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/work", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((result) => setWorks(JSON.parse(result).rows))
      .catch((error) => console.log("error", error));
  }, []);
  require("dayjs/locale/ru");
  return (
    <div className={cn('sectionInner', styles.grid)}>
      {works && works.map(el=><WorkShow work={el} withWorks={false} key={uuidv4()}></WorkShow>)}
    </div>
  );
};
