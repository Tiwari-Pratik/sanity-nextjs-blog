import urlFor from "@/lib/urlFor";
import Image from "next/image";
import styles from "./Article.module.css";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "./RichTextComponents";

interface ArticleProps {
  post: Post;
}
const Article = ({ post }: ArticleProps) => {
  return (
    <article className={styles.article}>
      <section className={styles.coverSection}>
        <Image
          src={urlFor(post.mainImage).url()}
          alt="cover-image"
          width={700}
          height={400}
          className={styles.coverImage}
        />
      </section>
      <section className={styles.titleSection}>
        <h1 className={styles.title}>{post.title}</h1>
      </section>

      <section className={styles.blogPost}>
        <PortableText value={post.body} components={RichTextComponents} />
      </section>
    </article>
  );
};

export default Article;
