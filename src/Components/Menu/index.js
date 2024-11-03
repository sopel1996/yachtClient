import React from "react";
import { Link } from "react-router-dom";

import style from "./style.module.css";

export const Menu = ({ children }) => {
  return (
    <ul className={style.menu}>
      <Link to="/" className={style.menuLink}>
        Главная
      </Link>
      <Link to="/works" className={style.menuLink}>
        Все работы
      </Link>
      <Link to="/works/create" className={style.menuLink}>
        Новая работа
      </Link>
      <Link to="/node/create" className={style.menuLink}>
        Создать узел
      </Link>
      <Link to="/node/" className={style.menuLink}>
        Список узелов
      </Link>
    </ul>
  );
};
