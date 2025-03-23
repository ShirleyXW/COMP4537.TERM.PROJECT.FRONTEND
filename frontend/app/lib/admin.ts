import axios from "axios";
import 

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

interface Admin {
  user_id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

export const fetchAdmin = async (): Promise<Admin> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/admin`, {
      withCredentials: true,
    });

    console.log(response.data)

    return response.data as Admin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
