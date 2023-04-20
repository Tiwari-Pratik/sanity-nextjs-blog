import styles from "./NodeButton.module.css";

interface nodeProps {
  clickActivity: () => void;
  isclicked: boolean;
}

const NodeButton = (props: nodeProps) => {
  const clickHandler = () => {
    props.clickActivity();
  };
  return (
    <div className={styles.nodeContainer}>
      <button
        className={`${styles.nodeBtn}`}
        disabled={props.isclicked ? true : false}
        onClick={clickHandler}
      >
        + Create New Node
      </button>
    </div>
  );
};

export default NodeButton;
