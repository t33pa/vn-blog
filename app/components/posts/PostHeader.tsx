import PostMetadata from "@/app/types/PostMetadata";
import TagSection from "../TagSection";

const PostHeader = (post: PostMetadata) => {
  return (
    <div className="post-header mt-6">
      <p className="text-3xl font-bold mb-3">{post.title}</p>
      <p className="mt-2 mb-3 text-xl text-slate-400 dark:text-slate-200">
        投稿日: {post.date}
      </p>
      <p className="text-xl">
        <TagSection tags={post.tag} />
      </p>
      <hr />
    </div>
  );
};

export default PostHeader;
