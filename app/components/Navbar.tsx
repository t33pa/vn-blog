import Link from "next/link";

type NavbarProps = {
  path: string;
};

const hilightLink = (path: string, currentPath: string) => {
  if (path === currentPath) {
    return "text-blue-500 dark:text-red-300";
  }
  return "text-slate-400 hover:text-blue-500 dark:hover:text-red-300";
};

const Navbar = (props: NavbarProps) => {
  const currentPath = props.path;
  return (
    <span className="sm:flex sm:justify-between text-2xl w-11/12 mt-2 mb-3">
      <Link href="/">
        <h1 className="sm:ml-5 sm:mt-0 text-center mt-3">Teepa's VN Blog</h1>
      </Link>
      <ul className="flex gap-4 invisible sm:visible">
        <li>
          <Link href="/" className={hilightLink("/", currentPath)}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/tags/all"
            className={hilightLink("/tags/all", currentPath)}
          >
            Search
          </Link>
        </li>
        <li>
          <Link href="/about" className={hilightLink("/about", currentPath)}>
            Links
          </Link>
        </li>
      </ul>
    </span>
  );
};

export default Navbar;
