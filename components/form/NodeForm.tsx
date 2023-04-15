import { MouseEvent } from "react";
import styles from "./NodeForm.module.css";

const NodeForm = () => {
  const userClickHandler = (event: MouseEvent): void => {
    console.log(event.target);
    const item = event.currentTarget as HTMLDivElement;
    item.classList.toggle(`${styles.itemClicked}`);
    const inputEl = item.children[0] as HTMLInputElement;
    inputEl.checked = !inputEl.checked;
    console.log("checkedValue", inputEl.checked);
    inputEl.value = inputEl.checked ? inputEl.name : "";
    console.log("inputcheckedValue", inputEl.value);
  };
  return (
    <form className={styles.form}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">Post Slug</label>
      <input type="text" name="slug" id="slug" />
      <div>
        <label htmlFor="user-select">Associated people</label>
        <div className={styles.users}>
          <div className={`${styles.item}`} onClick={userClickHandler}>
            <input type="checkbox" value="" name="pieter" />
            <label>Pieter</label>
          </div>
          <div className={`${styles.item}`} onClick={userClickHandler}>
            <input type="checkbox" value="" name="bhinder" />
            <label>Bhinder</label>
          </div>
          <div className={`${styles.item}`} onClick={userClickHandler}>
            <input type="checkbox" value="" name="manisha" />
            <label>Manisha</label>
          </div>
          <div className={`${styles.item}`} onClick={userClickHandler}>
            <input type="checkbox" value="" name="Ubaid" />
            <label>Ubaid</label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NodeForm;
