import { createTransaction, getTransactions } from "@/api/transaction.api";

import { QueryClient, useMutation } from "@tanstack/react-query";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useGetTransactions = (userId: string) => {
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions(userId),
    enabled: !!userId,
  });
};
