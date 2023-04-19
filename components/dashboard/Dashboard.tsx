import styles from "./Dashboard.module.css";
interface dashboardProps {
  children: React.ReactNode;
}

const Dashboard = (props: dashboardProps) => {
  return <div className={styles.dashboard}>{props.children}</div>;
};

export default Dashboard;
