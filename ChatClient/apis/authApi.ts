
import { appInfo } from '../constants/appInfors';
import axiosClient from './axiosClient';
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
class AuthAPI {
  HandleAuthentication = async (
    url: string,
    data?: any,
    method?: HttpMethod,
  ) => {
    return await axiosClient(`/${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;