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