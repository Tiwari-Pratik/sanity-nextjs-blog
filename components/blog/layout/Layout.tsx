import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Logo />
        <Navigation />
      </div>
      <SearchBox />
    </header>
  );
};
export default Layout;
