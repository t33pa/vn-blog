import playedVNs from "@/app/data/playedVns.json";
import backlogVns from "@/app/data/backlogVns.json";
import PlayedVNsData from "@/app/types/PlayedVNsData";
import searchVNArticle from "@/app/features/searchVNArticle";

import Link from "next/link";

const PlayedVNs = async () => {
  const playedVNsData: PlayedVNsData = playedVNs;
  const backlogVnsData: string[] = backlogVns.vn_titles;
  const vnTitles = playedVNsData.vn_titles;
  const scores = playedVNsData.scores;
  const updated = playedVNsData.updated_at;
  const playedTitleSection = vnTitles.map((vn) => {
    const score = scores[vnTitles.indexOf(vn)];
    const pageSlug = searchVNArticle(vn);
    if (pageSlug === "") {
      return (
        <li>
          {vn} ({score}点)
        </li>
      );
    } else {
      const postLink = "/posts/" + pageSlug;
      return (
        <li key={vn}>
          <Link href={postLink} className="text-blue-400">
            {vn}({score})
          </Link>
        </li>
      );
    }
  });
  const backlogTitleSection = backlogVnsData.map((vn) => {
    return <li key={vn}>{vn}</li>;
  });
  return (
    <div>
      <div className="bg-slate-200 dark:bg-slate-600 p-4 mt-3 mb-7 rounded-md shadow-md">
        <h1 className="text-2xl mb-3">プレイしたゲーム一覧</h1>
        <p>
          <Link
            href="https://erogamescape.org/~ap2/ero/toukei_kaiseki/"
            target="_blank"
            className="text-blue-400"
          >
            エロゲー批評空間
          </Link>
          から、自分のプレイした美少女ゲーム一覧と、それにつけたスコアを取得して表示しています。
        </p>
        <p>また、登録されてある積みゲーについても表示されます。</p>
        <p>
          そのゲームの感想記事がこのブログに投稿されている場合は、ゲームのタイトルをクリックすると、その感想記事を読むことができます
        </p>
        <p>
          (現在批評空間にゲームを登録する作業中で、一部登録が完了していないゲームがあります!)
        </p>
      </div>
      <div className="bg-slate-200 dark:bg-slate-600 p-4 mt-3 mb-7 rounded-md shadow-md">
        <h1 className="text-2xl mb-3">遊んだゲーム一覧</h1>
        <ul>{playedTitleSection}</ul>
        <br />
        <p>最終更新日: {updated}</p>
      </div>
      <div className="bg-slate-200 dark:bg-slate-600 p-4 mt-3 mb-7 rounded-md shadow-md">
        <h1 className="text-2xl mb-3">積みゲー</h1>
        <ul>{backlogTitleSection}</ul>
        <br />
        <p>最終更新日: {updated}</p>
      </div>
    </div>
  );
};

export default PlayedVNs;
