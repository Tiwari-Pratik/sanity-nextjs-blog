import Layout from "@/components/blog/layout/Layout";
import { client } from "@/lib/sanity.client";
import { GetServerSideProps } from "next";
import { groq } from "next-sanity";
import { Fragment } from "react";

interface PageProps {
  data: Post;
}
const PostPage = ({ data }: PageProps) => {
  console.log(data);
  return (
    <Fragment>
      <Layout />
      <div>Post page: {data.title}</div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const query = groq`
*[_type == "post" && slug.current == $slug][0]
{
...,
author->,
categories[]->
}
`;

  const postData: Post = await client.fetch(query, { slug });
  // console.log(postData);

  return {
    props: {
      data: postData,
    },
  };
};

export default PostPage;
