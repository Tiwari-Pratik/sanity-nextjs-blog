import { FormEvent, MouseEvent, useRef, useState } from "react";
import styles from "./NodeForm.module.css";
import CancelButton from "../buttons/CancelButton";
import NodeButton from "../buttons/NodeButton";
import useSWR, { mutate } from "swr";
import axios from "axios";
import useNodeStore from "@/store/nodeStore";
// import { Prisma } from "@prisma/client";

// interface formProps {
//   node: string | null;
//   role: string | null;
// }

const NodeForm = () => {
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

  const nodeItem = useNodeStore((state) => state.node);
  const roleItem = useNodeStore((state) => state.role);
  const updateItems = useNodeStore((state) => state.update);

  // console.log(nodeItem, roleItem);
  const { data: nodeData } = useSWR(
    () => (nodeItem ? `/api/nodes/${nodeItem}?role=${roleItem}` : null),
    fetcher
  );
  // console.log(nodeData);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const slugRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);

  let associatedPeople: string[] = nodeData?.data
    ? nodeData.data.persons.map(
      (person: { name: string; nickName: string; role: string }) =>
        person.nickName
    )
    : [];
  let associatedEvents: string[] = nodeData?.data
    ? nodeData.data.events.map(
      (event: { name: string; nickName: string; role: string }) =>
        event.nickName
    )
    : [];
  let associatedOrgs: string[] = nodeData?.data
    ? nodeData.data.organizations.map(
      (org: { name: string; nickName: string; role: string }) => org.nickName
    )
    : [];

  const oldAssociatedPeople = [...associatedPeople];
  const oldAssociatedEvents = [...associatedEvents];
  const oldAssociatedOrgs = [...associatedOrgs];
  // let associatedEvents: string[] = [];
  // let associatedOrgs: string[] = [];

  // console.log("Form component rendered");
  // console.log(associatedPeople);
  // console.log(associatedEvents);
  // console.log(associatedOrgs);

  enum Role {
    person = "PERSON",
    organization = "ORGANIZATION",
    event = "EVENT",
  }

  const nodeBtnhandler = () => {
    setNodeClicked(true);
    // updateItems("", "");
    // console.log(userData);
  };
  const cancelBtnhandler = () => {
    setNodeClicked(false);
    updateItems("", "");
  };
  const userClickHandler = (event: MouseEvent): void => {
    // console.log(event.target);
    const item = event.currentTarget as HTMLDivElement;
    item.classList.toggle(`${styles.itemClicked}`);
    const inputEl = item.children[0] as HTMLInputElement;
    inputEl.checked = !inputEl.checked;
    // console.log("checkedValue", inputEl.checked);
    inputEl.value = inputEl.checked ? inputEl.name : "";
    // console.log("inputcheckedValue", inputEl.value);
    if (inputEl.value !== "") {
      const index = associatedPeople.indexOf(inputEl.name);
      if (index <= -1) {
        associatedPeople.push(inputEl.name);
      } else {
        associatedPeople.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      const index = associatedPeople.indexOf(inputEl.name);
      if (index > -1) {
        // only splice array when item is found
        associatedPeople.splice(index, 1); // 2nd parameter means remove one item only
      } else {
        associatedPeople.push(inputEl.name);
      }
    }
    // console.log(associatedPeople);
  };

  const orgClickHandler = (event: MouseEvent): void => {
    // console.log(event.target);
    const item = event.currentTarget as HTMLDivElement;
    item.classList.toggle(`${styles.itemClicked}`);
    const inputEl = item.children[0] as HTMLInputElement;
    inputEl.checked = !inputEl.checked;
    // console.log("checkedValue", inputEl.checked);
    inputEl.value = inputEl.checked ? inputEl.name : "";
    // console.log("inputcheckedValue", inputEl.value);
    if (inputEl.value !== "") {
      const index = associatedOrgs.indexOf(inputEl.name);
      if (index <= -1) {
        associatedOrgs.push(inputEl.name);
      } else {
        associatedOrgs.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      const index = associatedOrgs.indexOf(inputEl.name);
      if (index > -1) {
        // only splice array when item is found
        associatedOrgs.splice(index, 1); // 2nd parameter means remove one item only
      } else {
        associatedOrgs.push(inputEl.name);
      }
    }
    // console.log(associatedOrgs);
  };

  const eventClickHandler = (event: MouseEvent): void => {
    // console.log(event.target);
    const item = event.currentTarget as HTMLDivElement;
    item.classList.toggle(`${styles.itemClicked}`);
    const inputEl = item.children[0] as HTMLInputElement;
    inputEl.checked = !inputEl.checked;
    // console.log("checkedValue", inputEl.checked);
    inputEl.value = inputEl.checked ? inputEl.name : "";
    // console.log("inputcheckedValue", inputEl.value);
    if (inputEl.value !== "") {
      const index = associatedEvents.indexOf(inputEl.name);
      if (index <= -1) {
        associatedEvents.push(inputEl.name);
      } else {
        associatedEvents.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      const index = associatedEvents.indexOf(inputEl.name);
      if (index > -1) {
        // only splice array when item is found
        associatedEvents.splice(index, 1); // 2nd parameter means remove one item only
      } else {
        associatedEvents.push(inputEl.name);
      }
    }
    // console.log(associatedEvents);
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
    updateItems("", "");
    mutate("/api/nodes/persons");
    mutate("/api/nodes/events");
    mutate("/api/nodes/organizations");
  };

  const updateHandler = async (event: FormEvent) => {
    event.preventDefault();
    const enteredName = nameRef.current?.value;
    const enteredSlug = slugRef.current?.value;
    const enteredRole = roleRef.current?.value;
    // console.log(typeof enteredRole);
    const nickName = enteredName?.toLowerCase().replaceAll(" ", "");
    const newConnectedPeople: string[] = associatedPeople.filter(
      (person: string) => {
        return !oldAssociatedPeople.includes(person);
      }
    );
    const newDisconnectedPeople: string[] = oldAssociatedPeople.filter(
      (person: string) => {
        return !associatedPeople.includes(person);
      }
    );
    const newConnectedEvents: string[] = associatedEvents.filter(
      (event: string) => {
        return !oldAssociatedEvents.includes(event);
      }
    );
    const newDisconnectedEvents: string[] = oldAssociatedEvents.filter(
      (event: string) => {
        return !associatedEvents.includes(event);
      }
    );
    const newConnectedOrgs: string[] = associatedOrgs.filter((org: string) => {
      return !oldAssociatedOrgs.includes(org);
    });
    const newDisconnectedOrgs: string[] = oldAssociatedOrgs.filter(
      (org: string) => {
        return !associatedOrgs.includes(org);
      }
    );

    console.log("logging arrays");
    console.log(newConnectedPeople);
    console.log(newConnectedEvents);
    console.log(newConnectedOrgs);
    console.log(newDisconnectedPeople);
    console.log(newDisconnectedEvents);
    console.log(newDisconnectedOrgs);

    const postData = {
      name: enteredName,
      role: enteredRole,
      nickName,
      postSlug: enteredSlug,
      connectPeople: newConnectedPeople,
      disconnectPeople: newDisconnectedPeople,
      connectEvents: newConnectedEvents,
      disconnectEvents: newDisconnectedEvents,
      connectOrgs: newConnectedOrgs,
      disconnectOrgs: newDisconnectedOrgs,
    };
    let resData;

    if (enteredRole === Role.person) {
      resData = await axios.put("/api/nodes/persons", postData);
    }
    if (enteredRole === Role.event) {
      resData = await axios.put("/api/nodes/events", postData);
    }
    if (enteredRole === Role.organization) {
      resData = await axios.put("/api/nodes/organizations", postData);
    }

    // console.log(resData);
    setNodeClicked(false);
    updateItems("", "");
    mutate("/api/nodes/persons");
    mutate("/api/nodes/events");
    mutate("/api/nodes/organizations");
  };

  return (
    <div className={styles.formContainer}>
      {!nodeItem && (
        <div className={styles.nodeContainer}>
          <NodeButton clickActivity={nodeBtnhandler} isclicked={nodeClicked} />
        </div>
      )}
      {nodeItem && (
        <div>
          <form className={styles.form} onSubmit={updateHandler}>
            <div className={styles.inputs}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                ref={nameRef}
                // value={nameValue ? nameValue : nodeData?.data?.name}
                // onChange={nameChangeHandler}
                defaultValue={nodeData?.data?.name}
              />
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                ref={roleRef}
                value={nodeData?.data.role}
                defaultValue={Role.person}
                aria-readonly
              >
                <option value={Role.person}>person</option>
                <option value={Role.organization}>organization</option>
                <option value={Role.event}>event</option>
              </select>
              <label htmlFor="slug">Post Slug</label>
              <input
                type="text"
                name="slug"
                id="slug"
                ref={slugRef}
                defaultValue={nodeData?.data?.postSlug}
              />
            </div>
            <div>
              <label htmlFor="user-select">Associated people</label>
              {userData.data?.length === 0 && <p>No Person data available</p>}
              {userData.data?.length > 0 && (
                <div className={styles.users}>
                  {userData.data.map((data: any) => {
                    if (data.nickName !== nodeData?.data.nickName) {
                      return (
                        <div
                          className={
                            associatedPeople.includes(data.nickName)
                              ? `${styles.item} ${styles.itemClicked}`
                              : `${styles.item}`
                          }
                          onClick={userClickHandler}
                          key={data.nickName}
                        >
                          <input
                            type="checkbox"
                            value=""
                            name={data.nickName}
                          />
                          <label>{data.name}</label>
                        </div>
                      );
                    }
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
                    if (data.nickName !== nodeData?.data.nickName) {
                      return (
                        <div
                          className={
                            associatedOrgs.includes(data.nickName)
                              ? `${styles.item} ${styles.itemClicked}`
                              : `${styles.item}`
                          }
                          onClick={orgClickHandler}
                          key={data.nickName}
                        >
                          <input
                            type="checkbox"
                            value=""
                            name={data.nickName}
                          />
                          <label>{data.name}</label>
                        </div>
                      );
                    }
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
                    if (data.nickName !== nodeData?.data.nickName) {
                      return (
                        <div
                          className={
                            associatedEvents.includes(data.nickName)
                              ? `${styles.item} ${styles.itemClicked}`
                              : `${styles.item}`
                          }
                          onClick={eventClickHandler}
                          key={data.nickName}
                        >
                          <input
                            type="checkbox"
                            value=""
                            name={data.nickName}
                          />
                          <label>{data.name}</label>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
            <button type="submit" className={styles.submit}>
              Update
            </button>
          </form>
          <div className={styles.nodeContainer}>
            <CancelButton clickActivity={cancelBtnhandler} />
          </div>
        </div>
      )}
      <div>
        {!nodeClicked && !nodeItem && <p>Node Data Preview</p>}
        {nodeClicked && !nodeItem && (
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
