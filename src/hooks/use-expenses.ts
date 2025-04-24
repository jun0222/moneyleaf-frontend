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
          category: { id: parseInt(values.category_id), name: "", created_at: "", updated_at: "" },
          store: values.store_id ? { id: parseInt(values.store_id), name: "", created_at: "", updated_at: "" } : undefined,
          item: values.item_id ? { id: parseInt(values.item_id), name: "", created_at: "", updated_at: "" } : undefined,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      },
    });
  }