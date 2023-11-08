import getPostMetadata from "./getPostMetadata";

const searchVNArticle = (title: string) => {
  const posts = getPostMetadata();
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].vn === title) {
      return posts[i].slug;
    }
  }
  return "";
};

export default searchVNArticle;
