import Link from "next/link";

const FooterMenu = () => {
  return (
    <span className="flex sm:invisible visible mx-auto justify-center gap-6 text-l w-11/12 mt-3 mb-3 text-slate-400">
      <Link href="/tags/all" className="hover:text-blue-500">
        記事の検索
      </Link>
      <Link href="/about" className="hover:text-blue-500">
        私について
      </Link>
    </span>
  );
};

export default FooterMenu;
