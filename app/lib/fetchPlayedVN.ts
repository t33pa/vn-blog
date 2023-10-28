import * as http from "http";
import * as https from "https";
import * as htmlparser2 from "htmlparser2";

const fetchPlayedVNs = async (): Promise<string[]> => {
  const url =
    "https://erogamescape.org/~ap2/ero/toukei_kaiseki/user_infomation.php?user=t33pa";
  const client = url.startsWith("https") ? https : http;

  return new Promise<string[]>((resolve, reject) => {
    let inTable = false;
    let inLink = false;
    let links: string[] = [];

    client
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const parser = new htmlparser2.Parser(
            {
              onopentag(name, attribs) {
                if (
                  name === "table" &&
                  attribs.summary === "得点ゲーム対応表"
                ) {
                  inTable = true;
                }
                if (inTable && name === "a") {
                  inLink = true;
                }
              },
              ontext(text) {
                if (inLink) {
                  links.push(text);
                }
              },
              onclosetag(name) {
                if (inLink && name === "a") {
                  inLink = false;
                }
                if (inTable && name === "table") {
                  inTable = false;
                }
              },
            },
            { decodeEntities: true }
          );

          parser.write(data);
          parser.end();

          resolve(links);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export default fetchPlayedVNs;
