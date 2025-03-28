import axios from "axios"

const API_BASE_URL = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";

export const login = async (prevState: string | null, formData: FormData) => {
    // Convert FormData to URLSearchParams for FastAPI OAuth2 compatibility
    const username = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    if (!username || !password) {
        return "Email and password are required";
    }
    
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    try {
        const res = await axios.post(`${API_BASE_URL}/auth/token`, params, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        if (res.status === 200) {
            // Return a success flag that the component can use to navigate
            return res.data;
        }
        
        return null;
    } catch (error: any) {
        console.error(error);
        if (error.response?.data?.detail) {
            return {"message": `${error.response.data.detail}`, "success": false};
        }
        return {"message": "Login failed. Please try again.", "success": false};
    }  
}

export async function logout() {
  try {
    await axios.delete(`${API_BASE_URL}/auth/token`, { withCredentials: true });
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}