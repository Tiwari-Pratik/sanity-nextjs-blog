import { MouseEvent, useState } from "react";
import styles from "./NodeForm.module.css";
import CancelButton from "../buttons/CancelButton";
import NodeButton from "../buttons/NodeButton";
import useSWR from "swr";

const NodeForm = () => {
  const [nodeClicked, setNodeClicked] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: userData } = useSWR("/api/persons", fetcher);
  const { data: eventData } = useSWR("/api/events", fetcher);
  const { data: orgData } = useSWR("/api/organizations", fetcher);

  const nodeBtnhandler = () => {
    setNodeClicked(true);
    console.log(userData);
  };
  const cancelBtnhandler = () => {
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
      <NodeButton clickActivity={nodeBtnhandler} isclicked={nodeClicked} />
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
                {userData.data.length === 0 && <p>No Person data available</p>}
                {userData.data.length > 0 && (
                  <div className={styles.users}>
                    <div
                      className={`${styles.item}`}
                      onClick={userClickHandler}
                    >
                      <input type="checkbox" value="" name="pieter" />
                      <label>Pieter</label>
                    </div>
                    <div
                      className={`${styles.item}`}
                      onClick={userClickHandler}
                    >
                      <input type="checkbox" value="" name="bhinder" />
                      <label>Bhinder</label>
                    </div>
                    <div
                      className={`${styles.item}`}
                      onClick={userClickHandler}
                    >
                      <input type="checkbox" value="" name="manisha" />
                      <label>Manisha</label>
                    </div>
                    <div
                      className={`${styles.item}`}
                      onClick={userClickHandler}
                    >
                      <input type="checkbox" value="" name="Ubaid" />
                      <label>Ubaid</label>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="user-select">Associated Organizations</label>
                {orgData.data.length === 0 && (
                  <p>No Organization data available</p>
                )}
                {orgData.data.length > 0 && (
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
                )}
              </div>
              <div>
                <label htmlFor="user-select">Associated Events</label>
                {eventData.data.length === 0 && <p>No Event data available</p>}
                {eventData.data.length > 0 && (
                  <div className={styles.users}>
                    <div
                      className={`${styles.item}`}
                      onClick={eventClickHandler}
                    >
                      <input type="checkbox" value="" name="dgh" />
                      <label>Dismantling Global Hindutva</label>
                    </div>
                    <div className={`${styles.item}`} onClick={orgClickHandler}>
                      <input type="checkbox" value="" name="iotb" />
                      <label>India on the Brink</label>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <CancelButton clickActivity={cancelBtnhandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeForm;
