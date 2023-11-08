package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"golang.org/x/net/html"
)

func fetchBacklogVNs() ([]string, error) {
	url := "https://erogamescape.org/~ap2/ero/toukei_kaiseki/user_only_possession.php?user=t33pa"

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	tokenizer := html.NewTokenizer(resp.Body)
	aContents := []string{}

	for {
        tokenType := tokenizer.Next()
        switch tokenType {
        case html.ErrorToken:
            // HTMLの終了またはエラーの場合、処理を終了
            return aContents, nil
        case html.StartTagToken:
            token := tokenizer.Token()
            if token.Data == "td" {
                // <td>要素の開始タグを発見
                for {
                    tokenType = tokenizer.Next()
                    if tokenType == html.ErrorToken {
                        break
                    } else if tokenType == html.StartTagToken && tokenizer.Token().Data == "a" {
                        // <a>要素を発見
                        for {
                            tokenType = tokenizer.Next()
                            if tokenType == html.TextToken {
                                // <a>要素内のテキストを取得
                                text := tokenizer.Token().Data
                                // スペースや改行をトリムして格納
                                aContents = append(aContents, strings.TrimSpace(text))
                            }
                            if tokenType == html.EndTagToken && tokenizer.Token().Data == "a" {
                                break
                            }
                        }
                    }
                }
            }
        }
	}

}

func fetchPlayedVNs() ([]string, []string ,error) {
	url := "https://erogamescape.org/~ap2/ero/toukei_kaiseki/user_infomation.php?user=t33pa"
	resp, err := http.Get(url)
	if err != nil {
		return nil, nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, nil, fmt.Errorf("HTTP request failed with status code %d", resp.StatusCode)
	}

	links := make([]string, 0)
	scores := make([]string, 0)
	inTable := false
	inLink := false
	inScore := false

	z := html.NewTokenizer(resp.Body)

	for {
		tt := z.Next()
		switch tt {
		case html.ErrorToken:
			return links, scores, nil
		case html.StartTagToken, html.SelfClosingTagToken:
			t := z.Token()
			if t.Data == "table" {
				for _, a := range t.Attr {
					if a.Key == "summary" && a.Val == "得点ゲーム対応表" {
						inTable = true
					}
				}
			}
			if inTable && t.Data == "a" {
				inLink = true
			}
			if inTable && t.Data == "span" {
				for _, a := range t.Attr {
					if a.Key == "class" && a.Val == "tokuten" {
						inScore = true
					}
				}
			}
		case html.TextToken:
			if inLink {
				text := string(z.Text())
				links = append(links, text)
				inLink = false
			}
			if inScore {
				text := string(z.Text())
				scores = append(scores, text)
				inScore = false
			}

		case html.EndTagToken:
			t := z.Token()
			if inLink && t.Data == "a" {
				inLink = false
			}
			if inTable && t.Data == "table" {
				inTable = false
			}
		}
	}
}

func filterBacklogVNs(contents []string) []string {
	var vnTitles []string
	for i := 0; i < len(contents); i++ {
		if contents[i] == "ログイン" {
			break
		}
		if i % 2 == 0 {
			vnTitles = append(vnTitles, contents[i])
		}
	}

	return vnTitles
}


func main() {
	links, scores, err := fetchPlayedVNs()
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	// Create a data structure to store the VN titles.
	vnData := struct {
		VNs []string `json:"vn_titles"`
		Scores []string `json:"scores"`
		Date string `json:"updated_at"`
	}{
		VNs: links,
		Scores: scores,
		Date: time.Now().Format("2006-01-02"),
	}

	fmt.Println(links)
	fmt.Println(scores)

	// Marshal the data structure into a JSON string.
	jsonData, err := json.Marshal(vnData)
	if err != nil {
		log.Fatalf("Error marshaling JSON: %v", err)
	}

	// Save the JSON string to a file.
	filename := "../data/playedVns.json"
	err = ioutil.WriteFile(filename, jsonData, 0644)
	if err != nil {
		log.Fatalf("Error saving JSON to file: %v", err)
	}

	fmt.Printf("List of played VNs saved to %s\n", filename)

	backlogVns, err :=  fetchBacklogVNs()
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	backlogVns = filterBacklogVNs(backlogVns)

	// Create a data structure to store the VN titles.
	backlogData := struct {
		VNs []string `json:"vn_titles"`
	}{
		VNs: backlogVns,
	}

	fmt.Println(backlogVns)

	// Marshal the data structure into a JSON string.
	jsonData, err = json.Marshal(backlogData)
	if err != nil {
		log.Fatalf("Error marshaling JSON: %v", err)
	}

	// Save the JSON string to a file.
	filename = "../data/backlogVns.json"
	err = ioutil.WriteFile(filename, jsonData, 0644)
	if err != nil {
		log.Fatalf("Error saving JSON to file: %v", err)
	}

	fmt.Printf("List of backlog VNs saved to %s\n", filename)
}