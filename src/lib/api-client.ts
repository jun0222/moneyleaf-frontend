// src/lib/api-client.ts
import axios from "axios";
import { Category, Expense, Item, Store } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/moneyleaf";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// カテゴリーのAPI関数
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>("/categories");
  return response.data;
};

// 店舗のAPI関数
export const fetchStores = async (): Promise<Store[]> => {
  const response = await apiClient.get<Store[]>("/stores");
  return response.data;
};

// 品目のAPI関数
export const fetchItems = async (): Promise<Item[]> => {
  const response = await apiClient.get<Item[]>("/items");
  return response.data;
};

// 支出データのAPI関数
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await apiClient.get<Expense[]>("/expenses");
  return response.data;
};

export const createExpense = async (expense: Omit<Expense, "id" | "created_at" | "updated_at">): Promise<Expense> => {
  const response = await apiClient.post<Expense>("/expenses", expense);
  return response.data;
};

// src/types/index.ts
export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: number;
  date: string;
  amount: number;
  category_id: number;
  store_id?: number;
  item_id?: number;
  created_at: string;
  updated_at: string;
  category: Category;
  store?: Store;
  item?: Item;
}

export interface ExpenseFormValues {
  date: Date;
  amount: number;
  category_id: string;
  store_id?: string;
  item_id?: string;
}

// src/hooks/use-master-data.ts
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchItems, fetchStores } from "@/lib/api-client";
import { Category, Item, Store } from "@/types";

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useStores() {
  return useQuery<Store[], Error>({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });
}

export function useItems() {
  return useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
}

// src/hooks/use-expenses.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExpense, fetchExpenses } from "@/lib/api-client";
import { Expense, ExpenseFormValues } from "@/types";

export function useExpenses() {
  return useQuery<Expense[], Error>({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (values: ExpenseFormValues) => {
      return createExpense({
        date: values.date.toISOString().split("T")[0],
        amount: values.amount,
        category_id: parseInt(values.category_id),
        store_id: values.store_id ? parseInt(values.store_id) : undefined,
        item_id: values.item_id ? parseInt(values.item_id) : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}