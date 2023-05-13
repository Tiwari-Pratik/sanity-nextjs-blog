import Layout from "@/components/blog/layout/Layout";
import { Fragment, lazy } from "react";
import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { PreviewSuspense } from "next-sanity/preview";
// import BlogList from "../components/bloglists/BlogList";
import LatestBlogs from "@/components/bloglists/LatestBlogs";
import Image from "next/image";
// import bnwImage from "../images/colorImage.png";
// import PreviewBlogList from "../components/bloglists/PreviewBlogList";

const PreviewBlogList = lazy(
  () => import("../components/bloglists/PreviewBlogList")
);

const query = groq`
*[_type=='post'] {
...,
author->,
categories[]->
} | order(_createdAt desc) [0...4]

`;
export const getServerSideProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  const data: Post[] = await client.fetch(query);
  // console.log(data[1]);
  return { props: { preview, data } };
};

export default function Home(props: { preview: boolean; data?: Post[] }) {
  if (props.preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <Layout />
        <p>In preview mode</p>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  return (
    <Fragment>
      <Layout />
      <div className="tagDiv">
        <h2 className="tagline">
          Next gen information. LabLite, discover the web of networks and the
          players behind every faultline
        </h2>
      </div>
      {props.data && <LatestBlogs posts={props.data} />}
      {/*{props.data && <BlogList posts={props.data} />}*/}
    </Fragment>
  );
}
