"use client";

import ModeToggle from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-primary">Moneyleaf</h1>
        <p className="text-muted-foreground">スマートな家計管理</p>
      </div>
      <ModeToggle />
    </header>
  );
}