import styles from "./Cancelbutton.module.css";

interface btnProps {
  clickActivity: () => void;
}
const CancelButton = (props: btnProps) => {
  const clickHandler = () => {
    props.clickActivity();
  };
  return (
    <div className={styles.nodeContainer}>
      <button className={`${styles.cancelBtn}`} onClick={clickHandler}>
        X Cancel
      </button>
    </div>
  );
};
export default CancelButton;
