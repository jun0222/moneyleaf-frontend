import { Header } from "@/components/header";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1">
          <ExpenseForm />
        </div>
        <div className="lg:col-span-2">
          <ExpenseList />
        </div>
      </div>
    </main>
  );
}