import Link from "next/link";
import styles from "./Posts.module.css";

const Posts = () => {
  return (
    <div className={styles.posts}>
      <Link href="/posts" className={styles.postsLink}>
        All Posts
      </Link>
      <Link href="/studio" className={styles.postsLink}>
        Studio
      </Link>
      <Link href="/dashboard" className={styles.postsLink}>
        Dashboard
      </Link>
    </div>
  );
};

export default Posts;
