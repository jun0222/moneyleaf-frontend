"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      
      // 初期値を設定
      setMatches(media.matches);
      
      // メディアクエリの変更を監視
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      
      // クリーンアップ関数
      return () => {
        media.removeEventListener("change", listener);
      };
    }
    
    return undefined;
  }, [query]);
  
  return matches;
}