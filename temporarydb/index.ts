import AsyncStorage from "@react-native-async-storage/async-storage";

export type Expense = {
  id: string;
  amount: string;
  category: "food" | "transport" | "other";
  date: Date;
  type: "expense" | "income";
  note?: string;
};
export type ExpenseRequest = Omit<Expense, "id" | "date">;
const STORAGE_KEY = "EXPENSES";

// ambil semua expense
type GetExpenseOptions = {
  month?: string; // format: YYYY-MM
};

export const getExpenses = async (
  options?: GetExpenseOptions
): Promise<Expense[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  let parsed: Expense[] = data ? JSON.parse(data) : [];

  // 🔥 inject dummy data kalau kosong
  if (parsed.length === 0) {
    const dummyExpenses: Expense[] = [
      {
        id: "1",
        amount: "50000",
        category: "food",
        date: new Date("2025-01-10"),
        note: "Lunch",
        type: "expense",
      },
      {
        id: "2",
        amount: "20000",
        category: "transport",
        date: new Date("2025-02-05"),
        note: "Taxi",
        type: "expense",
      },
    ];
    await saveExpenses(dummyExpenses);
    parsed = dummyExpenses;
  }
  const isSameMonth = (date: Date, month: string) => {
    const [year, monthIndex] = month.split("-").map(Number);
    return date.getFullYear() === year && date.getMonth() === monthIndex - 1;
  };
console.log();

  // ✅ FILTER BY MONTH (OPTIONAL)
  if (options?.month) {
    return parsed.filter((expense) =>
      isSameMonth(new Date(expense.date), options.month!)
    );
  }

  return parsed;
};

// simpan semua expense
export const saveExpenses = async (expenses: Expense[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

// tambah expense
export const addExpense = async (expense: ExpenseRequest) => {
  const current = await getExpenses(); // Expense[]
  const updated: Expense[] = [
    ...current,
    { ...expense, id: Date.now().toString(), date: new Date() },
  ];
  await saveExpenses(updated);
};

// hapus expense
export const deleteExpense = async (id: string) => {
  const current = await getExpenses();
  const updated = current.filter((item) => item.id !== id);
  await saveExpenses(updated);
};
