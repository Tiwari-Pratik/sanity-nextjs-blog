import Article from "@/components/article/Article";
import Layout from "@/components/blog/layout/Layout";
import NetworkBar from "@/components/networkBar/NetworkBar";
import { client } from "@/lib/sanity.client";
import { GetServerSideProps } from "next";
import { groq } from "next-sanity";
import { Fragment } from "react";

interface PageProps {
  data: Post;
}
const PostPage = ({ data }: PageProps) => {
  console.log(data);
  const role = data.role;
  const nickName = data.title.toLowerCase().replaceAll(" ", "");

  return (
    <Fragment>
      <Layout />
      <div className="articleContainer">
        <Article post={data} />
        <NetworkBar role={role} nickName={nickName} />
      </div>
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
