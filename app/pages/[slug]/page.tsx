import getPostMetadata from "@/app/components/getPostMetadata";
import PostPreview from "@/app/components/PostPreview";
import Pagination from "@/app/components/Pagination";

import { DEFAULT_MAX_ARTICLES } from "@/app/components/data/consts";

type PagesProps = {
  params: {
    slug: number;
  };
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  const length = Math.ceil(posts.length / DEFAULT_MAX_ARTICLES) - 1;
  const numberArray = Array.from({ length: length }, (_, i) => i + 1);
  return numberArray.map((number) => number.toString());
};

const Pages = (props: PagesProps) => {
  const slug = Number(props.params.slug);
  const startPoint = slug * DEFAULT_MAX_ARTICLES;
  const postMetadata = getPostMetadata();
  const sortedMetadata = postMetadata
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    })
    .slice(startPoint, startPoint + DEFAULT_MAX_ARTICLES);

  const postPreviews = sortedMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">{postPreviews}</div>
      <div>
        <Pagination page={slug} />
      </div>
    </div>
  );
};

export default Pages;
