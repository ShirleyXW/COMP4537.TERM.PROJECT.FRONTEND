
import axios from "axios";

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

export async function fetchApiKeyForUser(userId: number) {
    const res = await axios.get(`${API_BASE_URL}/api/get-key`, {
        withCredentials: true,
        params: {
            user_id: userId, // as query param: ?user_id=...
        },
    });
    return res.data.keys;
}

export interface UserBreakdown {
    username: string;
    email: string;
    token?: string[];  // or string if backend returns single key
    totalRequests: number;
}

export interface EndpointBreakdown {
    method: string;
    endpoint: string;
    totalRequests: number;
}

export const fetchUserBreakdown = async (): Promise<UserBreakdown[]> => {
    const apiKey = localStorage.getItem("api_key") || ""
    const res = await axios.get(`${API_BASE_URL}/admin/user-breakdown`, {
        withCredentials: true,
        headers: {
            api_key: apiKey,
        },
    });

    return res.data.data;
};

export async function fetchAllEndpoints() {
    const response = await axios.get(`${API_BASE_URL}/all-endpoints`, {
        withCredentials: true
    });
    return response.data;
}

export const fetchEndpointBreakdown = async (): Promise<EndpointBreakdown[]> => {
    const apiKey = localStorage.getItem("api_key") || "";
    const res = await axios.get(`${API_BASE_URL}/admin/stats/endpoint-breakdown`, {
        withCredentials: true,
        headers: {
            api_key: apiKey,
        },
    });
    return res.data.data;
};