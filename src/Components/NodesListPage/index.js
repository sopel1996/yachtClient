import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./style.module.css";
import api from "../../utils/api.js";
export const NodesListPage = () => {
  const deleteType =  (id)=>{
    api.getPromise(`api/type/${id}`, 'DELETE')
      .then((result) => console.log('Node deleted'))
      .catch((error) => console.log("error", error));
  };
  const [nodes, setNodes] = useState();
  useEffect(() => {
    api.getPromise(`api/type`, 'GET')
      .then((result) => setNodes(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className={cn('sectionInner')}>
      {nodes && nodes.map(el=>{
        return (<div className={styles.nodeContainer} key={uuidv4()}>
                  <span className={styles.name}>
                    {el.name}
                  </span>
                  <Link to={`/node/${el.id}/edit`} className={styles.editBtn}>
                  </Link>
                  <span className={styles.deleteBtn} onClick={()=>{
                    deleteType(el.id)
                  }}>
                  </span> 
                </div>)
          })}
    </div>
  );
};
