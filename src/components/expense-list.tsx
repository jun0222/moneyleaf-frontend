"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// 仮の支出データ
const expenses = [
  { id: 1, date: "2025-04-20", category: "食費", store: "スーパーA", amount: 3500 },
  { id: 2, date: "2025-04-19", category: "交通費", store: "駅前コンビニ", amount: 500 },
  { id: 3, date: "2025-04-18", category: "住居費", store: "", amount: 85000 },
];

export function ExpenseList() {
  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 金額をフォーマットする関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  // 合計金額を計算
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>支出一覧</CardTitle>
        <CardDescription>登録された支出の一覧 ({expenses.length}件)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日付</TableHead>
              <TableHead>分類</TableHead>
              <TableHead>店舗</TableHead>
              <TableHead className="text-right">金額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.store || "-"}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(expense.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            <div className="flex justify-end mt-2">
              <div className="font-bold">合計: {formatCurrency(totalAmount)}</div>
            </div>
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
}