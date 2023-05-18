import BlogList from "@/components/bloglists/BlogList";
import styles from "./Modal.module.css";

interface ModalProps {
  show: boolean;
  data: Post[];
  blurHandler: () => void;
}
const Modal = ({ show, data, blurHandler }: ModalProps) => {
  console.log(data);
  const clickHandler = () => {
    blurHandler();
  };
  return (
    <div className={show ? `${styles.modal}` : `${styles.hide}`}>
      <div className={styles.close}>
        <span className={styles.cross} onClick={clickHandler}>
          X
        </span>
      </div>
      <div className={styles.searchList} onClick={clickHandler}>
        {data?.[0] ? <BlogList posts={data} /> : "No results"}
      </div>
    </div>
  );
};

export default Modal;
