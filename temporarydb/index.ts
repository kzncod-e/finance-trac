import AsyncStorage from "@react-native-async-storage/async-storage";

export type Expense = {
  id: string;
  amount: string;
  category: "food" | "Transport" | "other";
  date: Date;
  note?: string;
};
export type ExpenseRequest = Omit<Expense, "id" | "date">;
const STORAGE_KEY = "EXPENSES";

// ambil semua expense
export const getExpenses = async (): Promise<Expense[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  const parsed = data ? JSON.parse(data) : [];
  // For testing, add dummy data if empty
  if (parsed.length === 0) {
    const dummyExpenses: Expense[] = [
      {
        id: "1",
        amount: "50000",
        category: "food",
        date: new Date(),
        note: "Lunch",
      },
      {
        id: "2",
        amount: "20000",
        category: "Transport",
        date: new Date(),
        note: "Taxi",
      },
    ];
    await saveExpenses(dummyExpenses);
    return dummyExpenses;
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
