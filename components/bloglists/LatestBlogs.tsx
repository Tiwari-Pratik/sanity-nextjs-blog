import React from "react";
import styles from "./LatestBlogs.module.css";

const LatestBlogs = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.blog} ${styles.blogDiv1}`}></div>
      <div className={`${styles.blog} ${styles.blogDiv2}`}></div>
      <div className={`${styles.blog} ${styles.blogDiv3}`}></div>
      <div className={`${styles.blog} ${styles.blogDiv4}`}></div>
    </div>
  );
};

export default LatestBlogs;
