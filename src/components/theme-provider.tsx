"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ 
  children,
  ...props
}: {
  children: React.ReactNode;
  // TODO: anyを使わないようにする
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  // クライアントサイドでのみレンダリングを行うためのフラグ
  const [mounted, setMounted] = useState(false);

  // マウント時にのみレンダリングする
  useEffect(() => {
    setMounted(true);
  }, []);

  // 初期レンダリング時にはテーマプロバイダーを使わない
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}