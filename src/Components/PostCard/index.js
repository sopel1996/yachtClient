import React, { useState, useContext } from "react";
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
import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";

// import { useLocalStorage } from "../../hooks/useLocalStorage";
// import ModalContext from "../../contexts/modalContext";
import styles from "./style.module.css";
import api from "../../utils/api.js";

import { Timeline } from "../Timeline";
// import PageContext from "../../contexts/PageContext";
export const PostCard = ({
  work
}) => {     

  require("dayjs/locale/ru");
  return (
    <CardMUI sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
         {work.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {work.category}
        </Typography>
        <Typography variant="body2">
          {work.createDate}
          <br />
          {work.period}
          <br />
          {work.description}
        </Typography>
      </CardContent>
      {/* <CardActions> */}
        {/* <Button size="small">Learn More</Button> */}
      {/* </CardActions> */}
    </CardMUI>
  );
};
