import Link from "next/link";
import styles from "./StudioNavbar.module.css";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const StudioNavbar = (props: any) => {
  return (
    <div>
      <div className={styles.studioNav}>
        <Link href="/">
          <ArrowUturnLeftIcon className={styles.arrow} />
        </Link>
        <p>Go back to website</p>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;
