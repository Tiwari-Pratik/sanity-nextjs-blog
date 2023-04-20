import styles from "./Cancelbutton.module.css";

interface btnProps {
  clickActivity: () => void;
}
const CancelButton = (props: btnProps) => {
  const clickHandler = () => {
    props.clickActivity();
  };
  return (
    <button className={`${styles.cancelBtn}`} onClick={clickHandler}>
      X Cancel
    </button>
  );
};
export default CancelButton;
