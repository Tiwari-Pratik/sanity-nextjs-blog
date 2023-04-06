import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import styles from "./RichTextComponents.module.css";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className={styles.imageDiv}>
          <Image
            src={urlFor(value).url()}
            alt="post-image"
            className={styles.image}
            width={500}
            height={300}
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className={styles.ulList}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className={styles.olList}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className={styles.listitem}>{children}</li>
    ),
    number: ({ children }: any) => (
      <li className={styles.listitem}>{children}</li>
    ),
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    h4: ({ children }: any) => <h4>{children}</h4>,
    p: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} rel={rel} className={styles.link}>
          {children}
        </Link>
      );
    },
  },
};
