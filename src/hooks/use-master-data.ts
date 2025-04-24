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
