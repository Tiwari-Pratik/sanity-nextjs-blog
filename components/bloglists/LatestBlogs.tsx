import React from "react";
import styles from "./LatestBlogs.module.css";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import Link from "next/link";
// import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

interface LatestBlogsProps {
  posts: Post[];
}

const LatestBlogs = ({ posts }: LatestBlogsProps) => {
  // console.log(posts);
  return (
    <div className={styles.container}>
      <div className={`${styles.blog} ${styles.blogDiv1}`}>
        <Link
          key={posts[0]._id}
          href={`/post/${posts[0].slug.current}`}
          className={styles.link}
        >
          <div className={styles.screenImage}>
            <Image
              src={urlFor(posts[0].mainImage).url()}
              alt={posts[0].author.name}
              width={300}
              height={400}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postData}>
            <p>{posts[0].title}</p>
            <p>
              {new Date(posts[0]._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={styles.readMore}>Read More </p>
          </div>
          <div className={styles.screen}></div>
        </Link>
      </div>
      <div className={`${styles.blog} ${styles.blogDiv2}`}>
        <Link
          key={posts[1]._id}
          href={`/post/${posts[1].slug.current}`}
          className={styles.link}
        >
          <div className={styles.screenImage}>
            <Image
              src={urlFor(posts[1].mainImage).url()}
              alt={posts[1].author.name}
              width={300}
              height={400}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postData}>
            <p>{posts[1].title}</p>
            <p>
              {new Date(posts[1]._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={styles.readMore}>Read More </p>
          </div>
          <div className={styles.screen}></div>
        </Link>
      </div>
      <div className={`${styles.blog} ${styles.blogDiv3}`}>
        <Link
          key={posts[2]._id}
          href={`/post/${posts[2].slug.current}`}
          className={styles.link}
        >
          <div className={styles.screenImage}>
            <Image
              src={urlFor(posts[2].mainImage).url()}
              alt={posts[2].author.name}
              width={300}
              height={400}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postData}>
            <p>{posts[2].title}</p>
            <p>
              {new Date(posts[2]._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={styles.readMore}>Read More </p>
          </div>
          <div className={styles.screen}></div>
        </Link>
      </div>
      <div className={`${styles.blog} ${styles.blogDiv4}`}>
        <Link
          key={posts[3]._id}
          href={`/post/${posts[3].slug.current}`}
          className={styles.link}
        >
          <div className={styles.screenImage}>
            <Image
              src={urlFor(posts[3].mainImage).url()}
              alt={posts[3].author.name}
              width={300}
              height={400}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postData}>
            <p>{posts[3].title}</p>
            <p>
              {new Date(posts[3]._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={styles.readMore}>Read More </p>
          </div>
          <div className={styles.screen}></div>
        </Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
