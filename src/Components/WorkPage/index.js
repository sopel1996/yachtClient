import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import { WorkShow } from "../WorkShow";

export const WorkPage = () => {
  const [work, setWork] = useState();
  const params = useParams();
  useEffect(() => {
    api.getPromise(`api/work/${params.id}`, "GET")
      .then((result) => setWork(result))
      .catch((error) => console.log("error", error));
  }, []);
  require("dayjs/locale/ru");
  return (
    <div>
      {work && <WorkShow work={work} withWorks={true}></WorkShow>}
    </div>
  );
};
