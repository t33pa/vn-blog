import ContactLink from "../components/ContactLink";
import { LinkData } from "../components/LinkData";
import snsLinks from "@/app/components/data/snsLink.json";

import Link from "next/link";

const About = () => {
  const snsLinkList: LinkData[] = snsLinks;

  const contactSection = snsLinkList.map((link) => (
    <ContactLink key={link.title} {...link} />
  ));

  return (
    <div>
      <div className="bg-slate-200 dark:bg-slate-600 p-4 mt-3 mb-7 rounded-md shadow-md">
        <h1 className="text-2xl mb-3">このブログについて</h1>
        <p>
          美少女ゲームが好きな、日本のどこかに住んでいる大学生です。プレイしたゲームの感想などをこのブログにまとめたいと思います。
        </p>
        <p>
          また、プログラミングが趣味で、このブログも、
          <Link
            href="https://nextjs.org/"
            target="_blank"
            className="text-blue-400"
          >
            Next.js
          </Link>
          を用いて作成しています。
        </p>
        <p className="mt-2">
          I'm a Japanese uni student who likes VNs. I'll write my reviews of VNs
          I read and random stuff here! I'm also interested in programming, and
          I built this blog with Next.js. Though I write my posts in Japanese, I
          speak English (and I'm learning Spanish too) so feel free contact me
          in English through my SNS accounts below!
        </p>
      </div>
      <div id="contact">
        <h1 className="text-2xl">Contacts</h1>
        {contactSection}
      </div>
    </div>
  );
};

export default About;
