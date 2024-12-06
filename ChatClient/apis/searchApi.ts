import axios from "axios";
import axiosClient from "./axiosClient";

export interface UserSearch {
    id: number,
    username: string,
    email: string,
    avatar: string,
}

class SearchApi {
    // Dùng axios để gọi API tìm kiếm
    // apiUrl = 'http://localhost:8080/api/v1/search';
    searchUsersByName = async (name: string, accessToken: string): Promise<UserSearch[]> => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axiosClient.get(
        `/search?name=${name}`,
        config
      )
      return response.data;
      };
}

const searchApi = new SearchApi();
export default searchApi;