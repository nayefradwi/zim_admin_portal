import type { Token } from "../models/token";
import type { User } from "../models/user";
import { apiClient } from "../api_client";
export interface IUserRepo {
    getUser(): Promise<User>;
    login(email: string, password: string): Promise<Token>;
}

export const UserRepo: IUserRepo = {
    getUser: async (): Promise<User> => {
        const response = await apiClient.get<User>("/users/me");
        return response.data as User;
    },
    login: async (email: string, password: string): Promise<Token> => {
        const response = await apiClient.post<Token>("/users/login", {
            email: email,
            password: password,
        });
        return response.data as Token;
    }
}
