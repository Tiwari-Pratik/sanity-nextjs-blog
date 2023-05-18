import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";
import styles from "./Layout.module.css";
import Posts from "./Posts";

const Layout = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Logo />
        <Navigation />
        <Posts />
      </div>
      <SearchBox />
    </header>
  );
};
export default Layout;
