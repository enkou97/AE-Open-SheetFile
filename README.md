# After Effects シートファイル自動オープンスクリプト

**Designed by T2_Enkou**

## 🎯 概要 / Overview

このスクリプトは、After Effects プロジェクト内のシートファイルを自動的に検出して開くツールです。  
`paint` フォルダー内にシートが見つからない場合は、`unused` または `_unused` フォルダー内を自動的に検索します。  
アニメ制作現場での素材管理や確認作業を効率化することを目的としています。

---

## ⚙️ 機能 / Features

-   `paint` フォルダー内のシートファイルを自動検索・オープン
-   `unused` / `_unused` フォルダー内の予備素材も自動探索
-   拡張子 `.jpg`, `.png`, `.tga`, `.tif`, `.tiff` に対応
-   正規表現による柔軟なフォルダー名・ファイル名判定
-   エラー発生時にユーザーに警告を表示

---

## 💻 使用方法 / How to Use

1. After Effects プロジェクトを開く
2. プロジェクトパスに `paint` フォルダーがあることを確認
3. スクリプトファイル（`08_open sheetFile.jsx`）を実行
4. `paint` 内にシートファイルがあれば自動的に開きます
5. 見つからない場合は `unused` フォルダーを自動検索します

---

## 🧠 開発背景 / Background

アニメ撮影現場での作業中、シートファイルの検索や開閉に時間がかかるという課題を感じました。  
そこで「**できるだけ少ない操作でシートを開く**」ことを目的に、本スクリプトを開発しました。

---

## 🛠 使用技術 / Technology

-   JavaScript (Adobe ExtendScript)
-   After Effects Scripting API
-   Regex (正規表現)
-   VSCode

---

## 📂 フォルダー構成例 / Folder Structure

ProjectFolder/
├── paint/
│ ├── [ProjectName]\_sheet/
│ │ ├── layout1.jpg
│ │ ├── layout2.png
│ └── ...
├── \_unused/
│ ├── [ProjectName]\_sheet/
│ │ ├── backup1.jpg
│ └── ...
└── 08_open sheetFile.jsx

