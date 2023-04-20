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
    <button
      className={`${styles.nodeBtn}`}
      disabled={props.isclicked ? true : false}
      onClick={clickHandler}
    >
      + Create New Node
    </button>
  );
};

export default NodeButton;
