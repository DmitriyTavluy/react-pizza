import React from "react";
import styles from "./NotFindPageBlock.module.scss";

const NotFindPageBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Неизвестная ошибка
      </h1>
      <p className={styles.description}>Попробуйте зайти позже</p>
    </div>
  );
};

export default NotFindPageBlock;
