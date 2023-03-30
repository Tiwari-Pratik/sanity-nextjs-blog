import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <div>
      <input type="search" />
      <MagnifyingGlassIcon className={styles.search} />
    </div>
  );
};

export default SearchBox;
