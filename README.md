## ローカル環境での起動

```bash
npm run dev
```

## コミットメッセージ

Conventional Commits 規約に従ってコミットメッセージを記述

```
<type>(<scope>): <subject>
```
###　参考 

- [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)
- [Github](https://github.com/conventional-changelog/commitlint)


### 例

```
feat(transactions): 収支入力画面にカテゴリ選択ドロップダウンを追加
fix(balance): 月間残高計算で端数が切り捨てられる不具合を修正
docs(readme): インストール手順と環境変数設定方法を追記
style(ui): ホーム画面のカード間マージンとフォントサイズを調整
refactor(db-schema): 支出テーブルのカラム構成を整理
perf(report): 月次レポート生成クエリを最適化して処理時間を短縮
test(api): 取引取得エンドポイントのユニットテストを追加
build(docker): Dockerfile に Node.js バージョン固定を導入
ci(github-actions): テストキャッシュを有効化してビルド時間を改善
chore(deps): 家計簿SDKを v2.1.0 にアップデート
revert(ui): Revert “style(ui): ホーム画面のカード間マージンとフォントサイズを調整”
```