import { api } from "./client";

export const createTransaction = async (transactionData: {
  userId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  description?: string;
}) => {
  const response = await api.post("/transactions", transactionData);
  return response.data;
};
export const getTransactions = async (userId: string) => {
  const response = await api.get(`/transactions?userId=${userId}`);
  return response.data;
};
export const deleteTransaction = async (transactionId: string) => {
  const response = await api.delete(`/transactions/${transactionId}`);
  return response.data;
};
