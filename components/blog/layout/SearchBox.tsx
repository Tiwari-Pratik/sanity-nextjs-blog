import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <div className={styles.searchDiv}>
      <input
        type="search"
        className={styles.search}
        placeholder="Search for..."
      />
      <MagnifyingGlassIcon className={styles.searchIcon} />
    </div>
  );
};

export default SearchBox;
