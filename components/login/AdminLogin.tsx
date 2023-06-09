import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};
export default AdminLogin;
