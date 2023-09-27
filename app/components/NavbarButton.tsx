import Link from "next/link";

type NavbarButtonProps = {
  name: string;
  path: string;
  currentPath: string;
};

const hilightLink = (path: string, currentPath: string) => {
  if (path === currentPath) {
    return "text-blue-500";
  }
  return "text-slate-400 hover:text-blue-500";
};

const NavbarButton = (props: NavbarButtonProps) => {
  const name = props.name;
  const path = props.path;
  const currentPath = props.path;
  return (
    <li>
      <Link href={path} className={hilightLink(path, currentPath)}>
        {name}
      </Link>
    </li>
  );
};

export default NavbarButton;
