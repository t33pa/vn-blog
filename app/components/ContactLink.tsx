import Image from "next/image";
import Link from "next/link";
import { LinkData } from "./LinkData";

const ContactLink = (props: LinkData) => {
  return (
    <Link
      className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 hover:border-blue-600 p-4 mt-2 mb-7 rounded-md shadow-md flex items-center"
      href={props.link}
    >
      <Image
        className="mr-4 flex items-center"
        src={`/icons/${props.icon}`}
        alt="thumbnail"
        width="46"
        height="46"
      ></Image>
      <h2 className="text-xl font-bold mr-5">{props.title}</h2>
      <p>{props.description}</p>
    </Link>
  );
};

export default ContactLink;
