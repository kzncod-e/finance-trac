import { api } from "./client";

export type User = {
  id: number;
  name: string;
  email: string;
};
export type UserResponse = {
  data: User;
  error: any;
};
export type LoginResponse = {
  data: {
    name: string;
    email: string;
    token: string;
  };
};
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<UserResponse> => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const login = async (userData: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await api.post("/users/login", userData);
  return response.data;
};
