import Image from "next/image";
import logo from "../../../public/images/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src={logo} alt="Logo" width={200} height={80} />
    </div>
  );
};

export default Logo;
