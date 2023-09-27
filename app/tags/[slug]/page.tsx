import getPostMetadata from "@/app/components/getPostMetadata";
import PostPreview from "@/app/components/PostPreview";
import { fetchAllTags, countPostsFromTag } from "@/app/components/tagUtils";

import Link from "next/link";

type TagPageProps = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  return fetchAllTags();
};

type TagCounter = {
  name: string;
  count: number;
};

const TagPage = (props: TagPageProps) => {
  // if the slug is "all", show all tags
  if (props.params.slug === "all") {
    const tags = fetchAllTags();
    const tagCountMap: TagCounter[] = tags.map((tag: string) => ({
      name: tag,
      count: countPostsFromTag(tag),
    }));
    const sortedTagCountMap = tagCountMap.sort((a, b) => b.count - a.count);
    const tagCountSection = sortedTagCountMap.map((tag: TagCounter) => (
      <span className="inline-block text-2xl text-slate-400 hover:text-blue-500 mr-2">
        <Link href={`/tags/${tag.name}`}>{tag.name}: </Link> {tag.count}
        件,
      </span>
    ));
    return (
      <div>
        <h1 className="text-2xl mt-5">記事のタグ一覧</h1>
        <p>
          それぞれのタグをクリックすることで、そのタグを含む記事を検索することができます
        </p>
        <div className="mt-5">{tagCountSection}</div>
      </div>
    );
  }

  // if the slug is not "all", show posts with the tag
  const tag = decodeURI(props.params.slug);
  const postMetadata = getPostMetadata();
  const sortedMetadata = postMetadata.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  const filteredMetadata = sortedMetadata.filter((post) =>
    post.tag.split(" ").includes(tag)
  );
  const postPreviews = filteredMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div>
      <h1 className="text-2xl mt-5">タグに{tag}を含む記事</h1>
      <div className="grid sm:grid-cols-2 gap-4">{postPreviews}</div>
    </div>
  );
};

export default TagPage;
