import { MouseEvent } from "react";
import styles from "./Sidebar.module.css";
import useSWR, { mutate } from "swr";
import useNodeStore from "@/store/nodeStore";
// import axios from "axios";

// interface sidebarProps {
//   nodeClick: (id: string, rol: string) => void;
// }

const Sidebar = () => {
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

  // const nodeItem = useNodeStore((state) => state.node)
  // const roleItem = useNodeStore((state) => state.role)
  const updateItems = useNodeStore((state) => state.update);

  const itemClickHandler = (event: MouseEvent): void => {
    const curTarget = event.currentTarget as HTMLDivElement;
    const target = event.target as HTMLLIElement;

    const divChildren = curTarget.children;
    // console.log(divChildren);

    const ulChildren: HTMLLIElement[] = [] as HTMLLIElement[];

    for (let i = 0; i < divChildren.length; i++) {
      const node = divChildren[i];
      const ul = node.children[1];
      const li = ul.children;
      // console.log(li);
      for (let j = 0; j < li.length; j++) {
        ulChildren.push(li[j] as HTMLLIElement);
      }
    }
    // console.log(ulChildren);

    for (let i = 0; i < ulChildren.length; i++) {
      // console.log(ulChildren[i]);
      if (ulChildren[i] !== target) {
        ulChildren[i].classList.remove(`${styles.clicked}`);
      }
    }

    target.classList.toggle(`${styles.clicked}`);
    // nodeClick(target.id, target.role!);
    updateItems(target.id, target.role!);
  };
  return (
    <div className={styles.sidebar} onClick={itemClickHandler}>
      <div className={styles.nodes}>
        <h3 className={styles.label}>Persons</h3>
        {
          <ul className={styles.list}>
            {userData?.data?.map((user: any) => {
              return (
                <li key={user.nickName} id={user.nickName} role={user.role}>
                  {user.name}
                </li>
              );
            })}
          </ul>
        }
      </div>
      <div className={styles.nodes}>
        <h3 className={styles.label}>Events</h3>
        {
          <ul className={styles.list}>
            {eventData?.data?.map((event: any) => {
              return (
                <li key={event.nickName} id={event.nickName} role={event.role}>
                  {event.name}
                </li>
              );
            })}
          </ul>
        }
      </div>
      <div className={styles.nodes}>
        <h3 className={styles.label}>Organizations</h3>
        {
          <ul className={styles.list}>
            {orgData?.data?.map((org: any) => {
              return (
                <li key={org.nickName} id={org.nickName} role={org.role}>
                  {org.name}
                </li>
              );
            })}
          </ul>
        }
      </div>
    </div>
  );
};

export default Sidebar;
