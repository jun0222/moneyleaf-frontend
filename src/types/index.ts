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
  
