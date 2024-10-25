import React from "react";
import { useNavigate } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as dayjs from "dayjs";
import styles from "./style.module.css";
export const WorkLineShow = ({ work }) => {
  const navigate = useNavigate();
  // require("dayjs/locale/ru");
  return (
    <Card
      sx={{ width: 330, margin: "0 0 30px 0" }}
      onClick={() => {
        navigate(`/works/${work.id}`);
      }}
      className={styles.cursorPointer}
    >
      <CardHeader
        title={work.name}
        subheader={
          "Дата выполнения следующей работы: " +
          dayjs(work.nextWorkDate, "YYYY-MM-DD").format("DD-MM-YYYY")
        }
      />
      <Typography
        sx={{ mb: 1.5 }}
        color="text.secondary"
        className={styles.padding}
      >
        {work.category}
      </Typography>
    </Card>
  );
};
