import { baseApi } from "@/services/baseApi";
import { User } from "../constants/types";

export function signup(email: string, password: string) {
    return baseApi.post<User>("/users/signup", { email, password }).then(res => res.data)
}
