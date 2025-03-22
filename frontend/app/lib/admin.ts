import axios from "axios";

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

interface User {
  user_id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

export const fetchAdmin = async (): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/admin`, {
      withCredentials: true,
    });

    return response.data as User;
  } catch (error) {
    throw error;
  }
};
