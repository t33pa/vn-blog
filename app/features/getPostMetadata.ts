import fs from "fs";
import PostMetadata from "@/app/types/PostMetadata";
import matter from "gray-matter";

const getPostMetadata = (): PostMetadata[] => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return Object.freeze({
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      tag: matterResult.data.tag,
      thumbnail: matterResult.data.thumbnail,
      vn: matterResult.data.vn,
      slug: fileName.replace(".md", ""),
    }) as PostMetadata;
  });

  return posts;
};

export default getPostMetadata;
