import Image from "next/image";
import logo from "../../../public/images/newlogo.png";
import styles from "./Logo.module.css";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image src={logo} alt="Logo" width={80} height={80} />
    </Link>
  );
};

export default Logo;
