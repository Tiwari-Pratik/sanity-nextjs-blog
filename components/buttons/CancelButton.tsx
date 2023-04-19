import styles from "./Cancelbutton.module.css";

interface btnProps {
  clickActivity: () => void;
}
const CancelButton = () => {
  return (
    <div className={styles.nodeContainer}>
      <button className={`${styles.cancelBtn}`}>X Cancel</button>
    </div>
  );
};
export default CancelButton;
