import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Enviroment } from "../../../environment";

const api = axios.create({
  baseURL: Enviroment.URL_BASE,
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { api };
