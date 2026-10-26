# 風險管理整合筆記

## 閱讀

直接開啟 `index.html`，即可離線閱讀文字、KaTeX 公式與重繪圖形。全文是同一頁，目錄僅跳轉閱讀位置，不依日期分頁。參考解答可隱藏供複習；電子論文連結需要網路。

`pdf/risk-management.pdf` 是同內容的整合 PDF，各主題為獨立可變高度頁面，文字可搜尋、可選取，適合匯入 Goodnotes。

## 上傳 GitHub Pages

1. 建立 GitHub repository，例如 `risk-management-notes`。
2. 解壓發布包，把此資料夾內的 `index.html`、`assets/`、`pdf/`、`README.md`、`.nojekyll` 上傳到 repository 根目錄。請勿再多包一層資料夾。
3. 在 repository 的 Settings → Pages 選擇從分支部署，選 `main` 分支及根目錄 `/ (root)`，儲存。
4. 發布完成後，從 GitHub 顯示的 Pages 網址閱讀，通常是 `https://你的帳號.github.io/risk-management-notes/`。

所有內部路徑都是相對路徑，已用 HTTP 子路徑驗證。上傳後保留完整 `assets/katex/fonts/`，公式才能離線顯示。

## 來源與界限

正文依六份手寫筆記重建，未取得錄音。補充推導及參考解答已標示。重點推導補上設式動機、運算步驟、假設與算例。另附 Columbia University 的選擇權補充教材連結。69 筆教師閱讀清單完整文字化，其中 20 筆附已定位電子入口，其餘標示待查全文。網站附外部論文連結，未包入原始教材或論文全文。

可變高度 PDF 的每個主題完整同頁，並非 A4。網站為一頁，PDF 依閱讀節點分頁。

## 第三方排版

公式採用 KaTeX（MIT License）。瀏覽器使用裝置內的中文字型，PDF 內含字型子集。
