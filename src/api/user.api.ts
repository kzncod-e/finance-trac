import { api } from "./client";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/users", userData);
  return response.data;
};
