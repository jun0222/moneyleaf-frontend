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