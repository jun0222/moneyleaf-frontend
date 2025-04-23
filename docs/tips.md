## commitlint

### インストール

```bash
npm install --save-dev husky
npx husky init

# コミットメッセージ検証用フックを作成
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg

# 実行権限を付与
chmod +x .husky/commit-msg
```

### rootに以下を設置

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat','fix','docs','style','refactor','perf','test','build','ci','chore','revert'
    ]],
    'scope-enum': [2, 'always', [
      'transactions','balance','readme','ui','db-schema','report','api','docker','github-actions','deps'
    ]],
    'header-max-length': [2, 'always', 72],
    'subject-case': [0],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  }
};
```

## touchコマンドで複数ファイルを作成

dirなかったらエラーになるので、mkdirで作成してから実行する

```bash
touch src/app/layout.tsx src/app/page.tsx src/components/header.tsx src/components/theme-provider.tsx src/components/query-provider.tsx src/components/expense-form.tsx src/hooks/use-master-data.ts src/hooks/use-expenses.ts src/lib/api-client.ts src/types/index.ts 
```

## Ecmascript file had an error

```bash
Build Error

Ecmascript file had an error

./src/app/layout.tsx (97:1)

Ecmascript file had an error
   95 |
   96 | // src/components/mode-toggle.tsx
>  97 | "use client";
      | ^^^^^^^^^^^^^
   98 |
   99 | import * as React from "react";
  100 | import { Moon, Sun } from "lucide-react";

The "use client" directive must be placed before other expressions. Move it to the top of the file to resolve this issue.
```



## リポジトリのセットアップ

### 1. リポジトリの作成

```bash
# 新しいディレクトリを作成
mkdir moneyleaf-frontend
cd moneyleaf-frontend
# Gitリポジトリを初期化
git init
# .gitignoreファイルを作成
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js
# testing
/coverage
# next.js
/.next/
/out/
# production
/build
# misc
.DS_Store
*.pem
# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# local env files
.env*.local
.env
# vercel
.vercel
# typescript
*.tsbuildinfo
next-env.d.ts
EOL
```

### 2. Next.js プロジェクトの初期化

```bash
# Next.jsプロジェクトを作成（TypeScriptを使用）
npx create-next-app@latest . --typescript --tailwind --eslint
# 質問に回答：
# ✔ Would you like to use TypeScript? … Yes
# ✔ Would you like to use ESLint? … Yes
# ✔ Would you like to use Tailwind CSS? … Yes
# ✔ Would you like to use `src/` directory? … Yes
# ✔ Would you like to use App Router? … Yes
# ✔ Would you like to customize the default import alias (@/*)? … Yes
```

### 3. shadcn/ui のインストール

```bash
# shadcn-uiのCLIをインストール
npx shadcn-ui@latest init
# 質問に回答：
# ✓ Would you like to use TypeScript (recommended)? … yes
# ✓ Which style would you like to use? › Default
# ✓ Which color would you like to use as base color? › Slate
# ✓ Where is your global CSS file? … src/app/globals.css
# ✓ Would you like to use CSS variables for colors? … yes
# ✓ Are you using a custom tailwind prefix eg. tw-? … no
# ✓ Where is your tailwind.config.js located? … tailwind.config.ts
# ✓ Configure the import alias for components: … @/components
# ✓ Configure the import alias for utils: … @/lib/utils
# ✓ Are you using React Server Components? … yes
# ✓ Write configuration to components.json. Proceed? … yes
# 必要なコンポーネントをインストール
npx shadcn-ui@latest add button
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add datepicker
```

### 4. API クライアントのセットアップ

```bash
# APIクライアントのインストール
npm install axios
# React Queryのインストール（データフェッチングと状態管理用）
npm install @tanstack/react-query
```

### 5. 環境変数の設定

```bash
# .envファイルを作成
cat > .env.local << EOL
NEXT_PUBLIC_API_URL=https://your-rails-api.render.com/api/moneyleaf
EOL
```

### 6. 最初のコミット

```bash
# 変更をステージング
git add .
# 最初のコミットを作成
git commit -m "Initial commit for Moneyleaf frontend with Next.js and shadcn/ui"
# リモートリポジトリの追加（GitHub, GitLab, Bitbucketなど）
git remote add origin https://github.com/yourusername/moneyleaf-frontend.git
# プッシュ
git push -u origin main
```


