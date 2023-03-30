import { usePreview } from "../../lib/sanity.preview";
import BlogList from "./BlogList";

interface PreviewBlogListProps {
  query: string;
}

const PreviewBlogList = (props: PreviewBlogListProps) => {
  const posts = usePreview(null, props.query);
  // console.log("Loading posts...",posts)
  return <BlogList posts={posts} />;
};

export default PreviewBlogList;
