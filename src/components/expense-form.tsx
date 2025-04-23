"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 仮のカテゴリーデータ
const categories = [
  { id: "1", name: "食費" },
  { id: "2", name: "交通費" },
  { id: "3", name: "住居費" },
];

// 仮の店舗データ
const stores = [
  { id: "1", name: "スーパーA" },
  { id: "2", name: "コンビニB" },
];

export function ExpenseForm() {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState<string>("");
  const [store, setStore] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, category, store, amount });
    // ここでデータ送信処理を実装
    
    // フォームリセット（日付は今日の日付を維持）
    setCategory("");
    setStore("");
    setAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>支出を記録</CardTitle>
        <CardDescription>日々の支出を簡単に記録できます</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">日付</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">分類</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="分類を選択" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store">店舗（任意）</Label>
            <Select value={store} onValueChange={setStore}>
              <SelectTrigger>
                <SelectValue placeholder="店舗を選択" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">金額</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">¥</span>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-6"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">支出を記録</Button>
        </form>
      </CardContent>
    </Card>
  );
}