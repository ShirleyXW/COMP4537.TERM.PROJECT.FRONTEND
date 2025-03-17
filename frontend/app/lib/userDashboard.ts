import "server-only";

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

export interface User {
    user_id: number;
    email: string;
    username: string;
    is_admin: boolean;
}

export const fetchUser = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch user. Please check your credentials.");
    }

    return response.json();
};
