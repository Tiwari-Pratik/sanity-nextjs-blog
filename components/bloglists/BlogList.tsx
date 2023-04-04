import urlFor from "@/lib/urlFor";
import Image from "next/image";
import styles from "./BlogList.module.css";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";

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
            <Link
              key={post._id}
              href={`/post/${post.slug.current}`}
              className={styles.link}
            >
              <div className={styles.postContainer}>
                <div className={styles.post}>
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.author.name}
                    width={300}
                    height={200}
                    className={styles.postImage}
                  />
                  <div className={styles.postData}>
                    <p>{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className={styles.postDesc}>
                  <p>{post.description}</p>
                </div>
                <div className={styles.readMoreDiv}>
                  <button className={styles.readMore}>
                    Read More{" "}
                    <ArrowUpRightIcon className={styles.readMoreArr} />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
