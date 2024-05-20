import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance, axiosService } from "../api/axios-service";
import { PostAuth } from "../api/axios-service-types";
import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface IAuthContext {
  token: string;
  login: (data: PostAuth) => Promise<AxiosResponse<any, any> | undefined>;
  register: (data: PostAuth) => Promise<AxiosResponse<any, any> | undefined>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  login: async () => {
    return undefined;
  },
  register: async () => {
    return undefined;
  },
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      const token = await getStoredToken("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          setToken(token);
        }
      }
    };

    if (token) {
      const axiosRequestIntereptor = axiosInstance.interceptors.request.use(
        (config) => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          config.headers.set("Accept", "application/json");

          return config;
        },
        (error) => {
          console.log(error);
          return Promise.reject(error);
        }
      );

      return () => {
        axiosInstance.interceptors.request.eject(axiosRequestIntereptor);
      };
    } else {
      getToken();
    }
  }, [token]);

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };

  const getStoredToken = async (field: string) => {
    try {
      const token = await AsyncStorage.getItem(field);
      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("ships");
    setToken("");
  };

  const handleLogin = async (data: PostAuth) => {
    try {
      const response = await axiosService.postLogin(data);

      if (response.status === 200) {
        setToken(response.data.accessToken);
        storeToken(response.data.accessToken);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.log(error);
      }
    }
  };

  const handleRegister = async (data: PostAuth) => {
    try {
      const response = await axiosService.postRegister(data);

      if (response.status === 200) {
        handleLogin(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login: handleLogin,
        register: handleRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
