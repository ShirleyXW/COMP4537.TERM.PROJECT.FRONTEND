
import axios from "axios";

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

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
    const res = await axios.get(`${API_BASE_URL}/admin/user-breakdown`, {
        withCredentials: true, 
    });

    return res.data.data;
};

export async function fetchAllEndpoints() {
    const response = await axios.get(`${API_BASE_URL}/all-endpoints`, {
        withCredentials: true,
    });
    return response.data;
}

export const fetchEndpointBreakdown = async (): Promise<EndpointBreakdown[]> => {
    const res = await axios.get(`${API_BASE_URL}/admin/stats/endpoint-breakdown`, {
        withCredentials: true,
    })
    return res.data.data;
} 