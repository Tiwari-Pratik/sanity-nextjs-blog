import Layout from "@/components/blog/layout/Layout";
import { Fragment } from "react";
import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { PreviewSuspense } from "next-sanity/preview";
import BlogList from "../components/bloglists/BlogList";
import PreviewBlogList from "../components/bloglists/PreviewBlogList";
import type { SanityDocument } from "@sanity/client";

const query = groq`
*[_type=='post'] {
...,
author->,
categories[]->
} | order(_createdAt desc)

`;
export const getStaticProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  const data: SanityDocument[] = await client.fetch(query);
  console.log(data);
  return { props: { preview, data } };
};

export default function Home(props: {
  preview: boolean;
  data?: SanityDocument[];
}) {
  if (props.preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <p>In preview mode</p>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  return (
    <Fragment>
      <Layout />
      <h2>Welcome page</h2>
      {props.data && <BlogList posts={props.data} />}
    </Fragment>
  );
}
