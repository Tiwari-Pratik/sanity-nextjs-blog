import Link from "next/link";
import styles from "./Posts.module.css";

const Posts = () => {
  return (
    <div className={styles.posts}>
      <Link href="/posts" className={styles.postsLink}>
        All Posts
      </Link>
    </div>
  );
};

export default Posts;
