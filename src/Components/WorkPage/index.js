import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api.js";
import { WorkShow } from "../WorkShow";

export const WorkPage = () => {
  const [work, setWork] = useState();
  const params = useParams();
  useEffect(() => {
    api
      .getPromise(`api/work/${params.id}`, "GET")
      .then((result) => setWork(result))
      .catch((error) => console.log("error", error));
  }, []);
  require("dayjs/locale/ru");
  return (
    <div style={(width = "100%")}>
      {work && <WorkShow work={work} withWorks={true}></WorkShow>}
    </div>
  );
};
