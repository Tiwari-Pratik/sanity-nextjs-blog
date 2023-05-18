import Layout from "@/components/blog/layout/Layout";
import { Fragment } from "react";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
// import { PreviewSuspense } from "next-sanity/preview";
import BlogList from "../../components/bloglists/BlogList";
// import LatestBlogs from "@/components/bloglists/LatestBlogs";
// import Image from "next/image";
// import bnwImage from "../images/colorImage.png";
// import PreviewBlogList from "../components/bloglists/PreviewBlogList";

const query = groq`
*[_type=='post'] {
...,
author->,
categories[]->
} | order(_createdAt desc)

`;
export const getServerSideProps = async () => {
  const data: Post[] = await client.fetch(query);
  // console.log(data[1]);
  return { props: { data } };
};

export default function Posts(props: { data?: Post[] }) {
  return (
    <Fragment>
      <Layout />
      {props.data && <BlogList posts={props.data} />}
    </Fragment>
  );
}
