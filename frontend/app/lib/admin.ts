import axios from "axios";

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

    return response.data as Admin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIsAdmin = async (): Promise<boolean | null> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/is-admin`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};