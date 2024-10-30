import { appInfo } from '../constants/appInfors';
import axiosClient from './axiosClient';

// Định nghĩa các phương thức HTTP
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// Định nghĩa kiểu cho cấu hình API
interface AxiosRequestConfig {
  method: HttpMethod;
  data?: any;
  headers?: {
    [key: string]: string; // Cho phép thêm bất kỳ header nào
  };
}

// Khai báo lớp AuthAPI
class AuthAPI {
  HandleAuthentication = async (
    url: string,
    accessToken?: string, // Thêm accessToken như tham số
    data?: any,
    method?: HttpMethod,
  ) => {
    const config: AxiosRequestConfig = {
      method: method ?? 'get',
      data,
      headers: {}, // Khởi tạo headers là một đối tượng rỗng
    };

    // Chỉ thêm Bearer Token nếu accessToken được cung cấp
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        ...config.headers, // Nếu cần, có thể giữ lại các header khác
      };
    }

    return await axiosClient(`/${url}`, config);
  };
}


// Xuất AuthAPI
const authenticationAPI = new AuthAPI();
export default authenticationAPI;
