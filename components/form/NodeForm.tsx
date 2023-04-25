import { FormEvent, MouseEvent, useRef, useState } from "react";
import styles from "./NodeForm.module.css";
import CancelButton from "../buttons/CancelButton";
import NodeButton from "../buttons/NodeButton";
import useSWR, { mutate } from "swr";
import axios from "axios";

interface formProps {
  node: string | null;
  role: string | null;
}

const NodeForm = ({ node, role }: formProps) => {
  const [nodeClicked, setNodeClicked] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: userData } = useSWR("/api/nodes/persons", fetcher, {
    revalidateOnMount: true,
  });
  const { data: eventData } = useSWR("/api/nodes/events", fetcher, {
    revalidateOnMount: true,
  });
  const { data: orgData } = useSWR("/api/nodes/organizations", fetcher, {
    revalidateOnMount: true,
  });

  const { data: nodeData } = useSWR(
    () => (node ? `/api/nodes/${node}?role=${role}` : null),
    fetcher
  );
  console.log(nodeData);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const slugRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);

  let associatedPeople: string[] = [];
  let associatedEvents: string[] = [];
  let associatedOrgs: string[] = [];

  console.log("Form component rendered");

  enum Role {
    person = "PERSON",
    organization = "ORGANIZATION",
    event = "EVENT",
  }

  const nodeBtnhandler = () => {
    setNodeClicked(true);
    // console.log(userData);
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
    if (inputEl.value !== "") {
      associatedPeople.push(inputEl.name);
    } else {
      const index = associatedPeople.indexOf(inputEl.name);
      if (index > -1) {
        // only splice array when item is found
        associatedPeople.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
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
    if (inputEl.value !== "") {
      associatedOrgs.push(inputEl.name);
    } else {
      const index = associatedOrgs.indexOf(inputEl.name);
      if (index > -1) {
        // only splice array when item is found
        associatedOrgs.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
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
    if (inputEl.value !== "") {
      associatedEvents.push(inputEl.name);
    } else {
      const index = associatedEvents.indexOf(inputEl.name);
      if (index > -1) {
        // only splice array when item is found
        associatedEvents.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const enteredName = nameRef.current?.value;
    const enteredSlug = slugRef.current?.value;
    const enteredRole = roleRef.current?.value;
    // console.log(typeof enteredRole);
    const nickName = enteredName?.toLowerCase().replaceAll(" ", "");
    const postData = {
      name: enteredName,
      role: enteredRole,
      nickName,
      postSlug: enteredSlug,
      people: associatedPeople,
      events: associatedEvents,
      orgs: associatedOrgs,
    };
    let resData;

    if (enteredRole === Role.person) {
      resData = await axios.post("/api/nodes/persons", postData);
    }
    if (enteredRole === Role.event) {
      resData = await axios.post("/api/nodes/events", postData);
    }
    if (enteredRole === Role.organization) {
      resData = await axios.post("/api/nodes/organizations", postData);
    }

    // console.log(resData);
    setNodeClicked(false);
    mutate("/api/nodes/persons");
    mutate("/api/nodes/events");
    mutate("/api/nodes/organizations");
  };
  return (
    <div className={styles.formContainer}>
      <p>{node}</p>
      <p>{role}</p>
      <p>{nodeData?.data?.name}</p>
      <div className={styles.nodeContainer}>
        <NodeButton clickActivity={nodeBtnhandler} isclicked={nodeClicked} />
      </div>
      <div>
        {!nodeClicked && <p>Node Data Preview</p>}
        {nodeClicked && (
          <div>
            <form className={styles.form} onSubmit={submitHandler}>
              <div className={styles.inputs}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" ref={nameRef} />
                <label htmlFor="role">Role</label>
                <select name="role" id="role" ref={roleRef}>
                  <option value={Role.person}>person</option>
                  <option value={Role.organization}>organization</option>
                  <option value={Role.event}>event</option>
                </select>
                <label htmlFor="slug">Post Slug</label>
                <input type="text" name="slug" id="slug" ref={slugRef} />
              </div>
              <div>
                <label htmlFor="user-select">Associated people</label>
                {userData.data?.length === 0 && <p>No Person data available</p>}
                {userData.data?.length > 0 && (
                  <div className={styles.users}>
                    {userData.data.map((data: any) => {
                      return (
                        <div
                          className={`${styles.item}`}
                          onClick={userClickHandler}
                          key={data.name}
                        >
                          <input
                            type="checkbox"
                            value=""
                            name={data.nickName}
                          />
                          <label>{data.name}</label>
                        </div>
                      );
                    })}
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
                    {orgData.data.map((data: any) => {
                      return (
                        <div
                          className={`${styles.item}`}
                          onClick={orgClickHandler}
                          key={data.name}
                        >
                          <input
                            type="checkbox"
                            value=""
                            name={data.nickName}
                          />
                          <label>{data.name}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="user-select">Associated Events</label>
                {eventData.data.length === 0 && <p>No Event data available</p>}

                {eventData.data.length > 0 && (
                  <div className={styles.users}>
                    {eventData.data.map((data: any) => {
                      return (
                        <div
                          className={`${styles.item}`}
                          onClick={eventClickHandler}
                          key={data.name}
                        >
                          <input
                            type="checkbox"
                            value=""
                            name={data.nickName}
                          />
                          <label>{data.name}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <button type="submit" className={styles.submit}>
                submit
              </button>
            </form>
            <div className={styles.nodeContainer}>
              <CancelButton clickActivity={cancelBtnhandler} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeForm;
