import getPostMetadata from "@/app/features/getPostMetadata";
import PostPreview from "@/app/components/PostPreview";
import Pagination from "@/app/components/Pagination";

import { DEFAULT_MAX_ARTICLES } from "./consts/consts";

const HomePage = () => {
  const postMetadata = getPostMetadata();
  const sortedMetadata = postMetadata
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    })
    .slice(0, DEFAULT_MAX_ARTICLES);
  const postPreviews = sortedMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">{postPreviews}</div>
      <div>
        <Pagination page={0} />
      </div>
    </div>
  );
};

export default HomePage;
