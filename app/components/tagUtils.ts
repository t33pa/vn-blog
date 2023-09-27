import getPostMetadata from "./getPostMetadata";

export const fetchAllTags = () => {
  const postMetadata = getPostMetadata();
  let tagList: string[] = [];
  postMetadata.forEach((post) => {
    tagList = tagList.concat(post.tag.split(" "));
  });

  // Remove duplicate tags
  return tagList.filter((item, index) => tagList.indexOf(item) === index);
};

export const countPostsFromTag = (tag: string): number => {
  const postMetadata = getPostMetadata();
  return postMetadata.filter((post) => post.tag.split(" ").includes(tag))
    .length;
};
