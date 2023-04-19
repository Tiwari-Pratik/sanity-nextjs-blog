import { MouseEvent, useState } from "react";
import styles from "./NodeForm.module.css";
import CancelButton from "../buttons/CancelButton";
import NodeButton from "../buttons/NodeButton";

const NodeForm = () => {
  const [nodeClicked, setNodeClicked] = useState<boolean>(false);

  const nodeBtnhandler = (event: MouseEvent) => {
    const btnEl = event.currentTarget as HTMLButtonElement;
    if (!nodeClicked) {
      btnEl.disabled = true;
    } else {
      btnEl.disabled = false;
    }
    setNodeClicked(true);
  };
  const cancelBtnhandler = (event: MouseEvent) => {
    setNodeClicked(false);
  };
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

  const orgClickHandler = (event: MouseEvent): void => {
    console.log(event.target);
    const item = event.currentTarget as HTMLDivElement;
    item.classList.toggle(`${styles.itemClicked}`);
    const inputEl = item.children[0] as HTMLInputElement;
    inputEl.checked = !inputEl.checked;
    console.log("checkedValue", inputEl.checked);
    inputEl.value = inputEl.checked ? inputEl.name : "";
    console.log("inputcheckedValue", inputEl.value);
  };

  const eventClickHandler = (event: MouseEvent): void => {
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
    <div className={styles.formContainer}>
      <NodeButton />
      <div>
        {!nodeClicked && <p>Node Data Preview</p>}
        {nodeClicked && (
          <div>
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
              <div>
                <label htmlFor="user-select">Associated Organizations</label>
                <div className={styles.users}>
                  <div className={`${styles.item}`} onClick={orgClickHandler}>
                    <input type="checkbox" value="" name="ofmi" />
                    <label>OFMI</label>
                  </div>
                  <div className={`${styles.item}`} onClick={orgClickHandler}>
                    <input type="checkbox" value="" name="iamc" />
                    <label>IAMC</label>
                  </div>
                  <div className={`${styles.item}`} onClick={orgClickHandler}>
                    <input type="checkbox" value="" name="hfhr" />
                    <label>HFHR</label>
                  </div>
                  <div className={`${styles.item}`} onClick={orgClickHandler}>
                    <input type="checkbox" value="" name="jfa" />
                    <label>JFA</label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="user-select">Associated Events</label>
                <div className={styles.users}>
                  <div className={`${styles.item}`} onClick={eventClickHandler}>
                    <input type="checkbox" value="" name="dgh" />
                    <label>Dismantling Global Hindutva</label>
                  </div>
                  <div className={`${styles.item}`} onClick={orgClickHandler}>
                    <input type="checkbox" value="" name="iotb" />
                    <label>India on the Brink</label>
                  </div>
                </div>
              </div>
            </form>
            <CancelButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeForm;
