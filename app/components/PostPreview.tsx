import Image from "next/image";
import Link from "next/link";
import PostMetadata from "@/app/types/PostMetadata";
import TagSection from "@/app/components/TagSection";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="post-preview border border-slate-400 hover:border-blue-600 hover:bg-slate-200 dark:hover:bg-slate-600 pt-4 pr-4 pb-2 pl-4 mt-5 rounded-md shadow-md">
      <Link href={`/posts/${props.slug}`}>
        <Image
          src={`/images/${props.thumbnail}`}
          alt="thumbnail"
          width="0"
          height="0"
          sizes="100vw"
          loading="eager"
          style={{ width: "100%", height: "56%" }}
        />
        <p className="text-xl mb-5 mt-5">{props.title}</p>
        <p className="text-sm text-slate-400 dark:text-slate-200">
          {props.date}
        </p>
      </Link>
      <TagSection tags={props.tag} />
    </div>
  );
};

export default PostPreview;
