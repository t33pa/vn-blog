import fetchPlayedVNs from "../lib/fetchPlayedVN";

import Link from "next/link";

const PlayedVNs = async () => {
  const playedVNs = await fetchPlayedVNs();
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
          から、自分のプレイした美少女ゲーム一覧を取得して表示しています。
        </p>
        <p>
          そのゲームの感想記事がこのブログに投稿されている場合は、ゲームのタイトルをクリックすると、その感想記事を読むことができます
        </p>
      </div>
      <div className="bg-slate-200 dark:bg-slate-600 p-4 mt-3 mb-7 rounded-md shadow-md">
        <h1 className="text-2xl mb-3">ゲーム一覧</h1>
        <ul>
          {playedVNs.map((vn) => (
            <li key={vn}>{vn}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayedVNs;
