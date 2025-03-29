import axios from "axios";

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";
// const API_BASE_URL = "http://localhost:8000/api/v1";

export interface User {
  user_id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      withCredentials: true,
    });

    return response.data as User;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchUserId = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/id`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
