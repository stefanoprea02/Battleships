import axios from "axios";
import {
  LoginReponse,
  PostAuth,
  UserResponse,
  User,
} from "./axios-service-types";

export const axiosInstance = axios.create({
  baseURL: "http://163.172.177.98:8081",
});

export const axiosService = {
  postRegister: async (body: PostAuth) =>
    await axiosInstance.post<User>("/auth/register", body),

  postLogin: async (body: PostAuth) =>
    await axiosInstance.post<LoginReponse>("/auth/login", body),

  getLoggedUser: async () =>
    await axiosInstance.get<UserResponse>("/user/details/me"),
};
