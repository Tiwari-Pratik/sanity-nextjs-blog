import Layout from "@/components/blog/layout/Layout";
import { Fragment, lazy } from "react";
import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { PreviewSuspense } from "next-sanity/preview";
import BlogList from "../components/bloglists/BlogList";
// import PreviewBlogList from "../components/bloglists/PreviewBlogList";

const PreviewBlogList = lazy(
  () => import("../components/bloglists/PreviewBlogList")
);

const query = groq`
*[_type=='post'] {
...,
author->,
categories[]->
} | order(_createdAt desc)

`;
export const getServerSideProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  const data: Post[] = await client.fetch(query);
  console.log(data);
  return { props: { preview, data } };
};

export default function Home(props: { preview: boolean; data?: Post[] }) {
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
