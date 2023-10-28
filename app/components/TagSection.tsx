import Link from "next/link";
const TagSection = ({ tags }: { tags: string }) => {
  const tagLinkList = tags.split(" ");
  const tagSection = tagLinkList.map((tag) => (
    <Link
      href={`/tags/${tag}`}
      className="text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-red-300"
    >
      {tag + " "}
    </Link>
  ));
  return <p>{tagSection}</p>;
};

export default TagSection;
