import React from "react";
import useSWR from "swr";
import styles from "./NetworkBar.module.css";
import Link from "next/link";
interface NetworkProps {
  role: string;
  nickName: string;
}

const NetworkBar = ({ role, nickName }: NetworkProps) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  console.log(nickName);

  const { data: nodeData } = useSWR(
    `/api/nodes/${nickName}?role=${role.toUpperCase()}`,
    fetcher
  );
  console.log(nodeData);

  return (
    <div className={styles.sidebar}>
      <h3>Connections</h3>
      <div className={styles.nodes}>
        <h3 className={styles.label}>People</h3>
        {
          <ul className={styles.list}>
            {nodeData?.data?.persons.map((user: any) => {
              return (
                <li key={user.nickName} id={user.nickName} role={user.role}>
                  <Link href={`/post/${user.postSlug}`} className={styles.link}>
                    {user.name}
                  </Link>
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
            {nodeData?.data?.events.map((event: any) => {
              return (
                <li key={event.nickName} id={event.nickName} role={event.role}>
                  <Link
                    href={`/post/${event.postSlug}`}
                    className={styles.link}
                  >
                    {event.name}
                  </Link>
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
            {nodeData?.data?.organizations.map((org: any) => {
              return (
                <li key={org.nickName} id={org.nickName} role={org.role}>
                  <Link href={`/post/${org.postSlug}`} className={styles.link}>
                    {org.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        }
      </div>
    </div>
  );
};

export default NetworkBar;
