import urlFor from "@/lib/urlFor";
import Image from "next/image";
import styles from "./BlogList.module.css";

interface BlogListProps {
  posts: Post[];
}
const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div>
      <hr />
      <div className={styles.container}>
        {posts.map((post) => {
          return (
            <div key={post._id} className={styles.postContainer}>
              <div className={styles.post}>
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.author.name}
                  width={300}
                  height={200}
                  className={styles.postImage}
                />
                <p>{post.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
