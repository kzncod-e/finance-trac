import { createUser } from "@/api/user.api";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
