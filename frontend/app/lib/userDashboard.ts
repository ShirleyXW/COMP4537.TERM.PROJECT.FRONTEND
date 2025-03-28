import axios from "axios"

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";
// const API_BASE_URL = "http://localhost:8000/api/v1";

export interface User {
    user_id: number,
    email: string,
    username: string,
    is_admin: boolean,
}
interface APIKey {
    id: number;
    key: string;
    key_name: string;
    active: boolean;
}

export const fetchUser = async (): Promise<User> => {

    try {
        const response = await axios.get(`${API_BASE_URL}/users/me`, {
            withCredentials: true,
        });

        return response.data as User
        
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error
    }  
}

export const fetchApiKeys = async (user_id:number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get-key?user_id=${user_id}`, {
            withCredentials: true,
        });

        const result:APIKey[] = response.data.keys;
        const apiTable = result.map((keyObject) => ({
            key: keyObject.key,
            key_name: keyObject.key_name,
            status: keyObject.active ? "active" : "inactive",
            action: {
                toggleStatus: "Toggle Status",
                deleteKey: user_id,
            }
        }
    ));
        console.log("API Table:", apiTable);
        return apiTable;
    } catch (error) {
        console.error("Error fetching API keys:", error);
        throw error
    }
}

export interface UserUsage {
    request_limit: number,
    total_used: number,
    remaining_requests: number,
}

export const fetchUserUsage = async (): Promise<UserUsage> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/usage`, {
            withCredentials: true,
        });
        return response.data as UserUsage
    } catch (error) {
        console.log("Error fetching usage:", error);
        throw error;
    }
}