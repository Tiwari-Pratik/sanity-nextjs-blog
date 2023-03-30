import Layout from "@/components/blog/layout/Layout";
import { Fragment } from "react";

import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { DocumentsCount, query } from "../components/DocumentsCount";
import { client } from "../lib/sanity.client";

const PreviewDocumentsCount = lazy(
  () => import("../components/PreviewDocumnetsCount")
);

export const getStaticProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  const data = await client.fetch(query);

  return { props: { preview, data } };
};

export default function Home({ preview, data: object }) {
  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewDocumentsCount />
      </PreviewSuspense>
    );
  }

  return (
    <Fragment>
      <Layout />
      <h2>Welcome page</h2>
      <DocumentsCount data={data} />
    </Fragment>
  );
}
