
import axios from "axios";

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

export interface UserBreakdown {
    username: string;
    email: string;
    token?: string[];  // or string if backend returns single key
    totalRequests: number;
}

export const fetchUserBreakdown = async (): Promise<UserBreakdown[]> => {
    const res = await axios.get(`${API_BASE_URL}/admin/user-breakdown`, {
        withCredentials: true, 
    });

    return res.data.data;
};