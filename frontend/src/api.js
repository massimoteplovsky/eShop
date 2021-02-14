import axios from "axios";
import {API_URL} from "./consts";

const createAPI = () => {

  const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = ({data}) => data;

  const onFailure = (error) => {
    const {data} = error.response;
    return Promise.reject(data);
  }

  api.interceptors.response.use(onSuccess, onFailure);

  return api;
}

export default createAPI;
