
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// 仮の支出データ
const expenses = [
  { id: 1, date: "2025-04-20", category: "食費", store: "スーパーA", amount: 3500 },
  { id: 2, date: "2025-04-19", category: "交通費", store: "駅前コンビニ", amount: 500 },
  { id: 3, date: "2025-04-18", category: "住居費", store: "", amount: 85000 },
  { id: 4, date: "2025-03-25", category: "食費", store: "スーパーB", amount: 2800 },
  { id: 5, date: "2025-03-15", category: "交通費", store: "タクシー", amount: 1500 },
];

export function ExpenseList() {
  // 日付から日だけを取得する関数
  const getDayOfMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };
  
  // 日付から曜日を取得する関数
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return days[date.getDay()];
  };
  
  // 日付から月を取得する関数
  const getMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; // JavaScriptの月は0から始まるので+1
  };
  
  // 日付から年を取得する関数
  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  // 金額をフォーマットする関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };
  
  // 支出を月ごとにグループ化
  const groupByMonth = () => {
    const groups: { [key: string]: typeof expenses } = {};
    
    expenses.forEach(expense => {
      const year = getYear(expense.date);
      const month = getMonth(expense.date);
      const key = `${year}-${month}`;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      
      groups[key].push(expense);
    });
    
    // 月ごとにソート（新しい月が上に来るように）
    return Object.entries(groups)
      .sort(([keyA], [keyB]) => {
        // 数値でソートするため、年と月を分解して比較
        const [yearA, monthA] = keyA.split('-').map(Number);
        const [yearB, monthB] = keyB.split('-').map(Number);
        
        // 年で比較し、同じ年なら月で比較
        return yearB !== yearA ? yearB - yearA : monthB - monthA;
      })
      .map(([key, expenseList]) => {
        const [year, month] = key.split('-').map(Number);
        // 日付でソート（新しい日付が上に来るように）
        const sortedExpenses = [...expenseList].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return {
          key,
          title: `${year}年${month}月`,
          expenses: sortedExpenses,
          total: sortedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        };
      });
  };
  
  const monthlyGroups = groupByMonth();
  
  // 表示する月のインデックス（デフォルトは最新の月）
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const currentMonth = monthlyGroups[currentMonthIndex];
  
  // 月を切り替える関数
  const changeMonth = (index: number) => {
    if (index >= 0 && index < monthlyGroups.length) {
      setCurrentMonthIndex(index);
    }
  };

  return (
    <Card className="container mx-auto max-w-6xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>支出一覧</CardTitle>
            <CardDescription className="mt-1">登録された支出の一覧</CardDescription>
          </div>
          
          <div className="flex space-x-2">
            {monthlyGroups.map((group, index) => (
              <button
                key={group.key}
                onClick={() => changeMonth(index)}
                className={cn(
                  "px-3 py-1 text-sm rounded-md",
                  currentMonthIndex === index 
                    ? "bg-gray-900 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {group.title}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{currentMonth.title}</h3>
          <div className="font-mono text-sm font-medium">
            合計: {formatCurrency(currentMonth.total)}
          </div>
        </div>
        
        <div className="space-y-2">
          {currentMonth.expenses.map((expense) => (
            <Card 
              key={expense.id} 
              className="border border-gray-200 bg-white shadow-sm"
            >
              <div className="px-3 flex items-center">
                <div className="flex-shrink-0 w-10 text-center mr-3">
                  <div className="text-2xl font-semibold">{getDayOfMonth(expense.date)}</div>
                  <div className="text-xs text-gray-500">({getDayOfWeek(expense.date)})</div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-gray-900">{expense.store || "未記入"}</div>
                    <div className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded">{expense.category}</div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4 text-right">
                  <div className="font-mono font-medium">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">全期間</span>
          <div className="font-mono font-bold text-xl">
            {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}