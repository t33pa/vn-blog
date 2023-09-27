import getPostMetadata from "@/app/components/getPostMetadata";
import { DEFAULT_MAX_ARTICLES } from "./data/consts";

import Link from "next/link";

type PaginationProps = {
  page: number;
};

const Pagination = (props: PaginationProps) => {
  const page = props.page;
  const leftPage = page - 1;
  const rightPage = page + 1;
  const postCount: number = getPostMetadata().length;
  const maximumPageNumber = Math.ceil(postCount / DEFAULT_MAX_ARTICLES) - 1;

  let leftButton, rightButton;
  let leftLink = `/pages/${leftPage}`;

  if (page === 0) {
    leftButton = <span className="text-slate-400 mr-2">＜</span>;
  } else if (page === 1) {
    leftLink = "/";
  }

  if (page !== 0) {
    leftButton = (
      <span className="text-blue-500 mr-2">
        <Link href={leftLink}>＜</Link>
      </span>
    );
  }

  if (page === maximumPageNumber) {
    rightButton = <span className="text-slate-400 ml-2">＞</span>;
  } else {
    rightButton = (
      <span className="text-blue-500 ml-2">
        <Link href={`/pages/${rightPage}`}>＞</Link>
      </span>
    );
  }

  return (
    <div className="text-center text-2xl mt-9">
      {leftButton}
      {page + 1}
      {rightButton}
    </div>
  );
};

export default Pagination;
