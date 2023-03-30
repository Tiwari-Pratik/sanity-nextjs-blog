import type { SanityDocument } from "@sanity/client";
interface BlogListProps {
  posts: SanityDocument[];
}
const BlogList = (props: BlogListProps) => {
  return <div>Blogs</div>;
};

export default BlogList;
