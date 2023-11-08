import Link from "next/link";

import ToggleDarkMode from "./ToggleDarkMode";

const FooterMenu = () => {
  return (
    <div>
      <div className="flex sm:invisible visible mx-auto justify-center gap-6 text-l w-11/12 mt-3 mb-3 text-slate-400">
        <Link href="/tags/all" className="hover:text-blue-500">
          記事の検索
        </Link>
        <Link href="/about" className="hover:text-blue-500">
          私について
        </Link>
        <Link href="/vns" className="hover:text-blue-500">
          VN一覧
        </Link>
      </div>
      <div className="mx-auto text-center mt-4 sm:invisible visible">
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default FooterMenu;
