import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";

import getPostMetadata from "@/app/features/getPostMetadata";
import PostHeader from "@/app/components/posts/PostHeader";

type PostPageProps = {
  params: {
    slug: string;
  };
};

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props: PostPageProps) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  const postMetadata = getPostMetadata().find((post) => post.slug === slug)!;
  return (
    <div>
      <PostHeader {...postMetadata} />
      <article className="prose lg:prose-xl prose-stale dark:prose-invert">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
