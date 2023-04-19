import styles from "./NodeButton.module.css";
const NodeButton = () => {
  return (
    <div className={styles.nodeContainer}>
      <button className={`${styles.nodeBtn}`}>+ Create New Node</button>
    </div>
  );
};

export default NodeButton;
