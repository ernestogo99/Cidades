import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("erro de conexão"));
  }

  //erro de autenticação com o backend
  if (error.response?.status === 401) {
    //algo
  }

  return Promise.reject(error); // encaminhar o erro
};
