
const productUrl = "https://bcit-anthony-sh-s.com/lumisenseai/api/v1";
const localUrl = "http://localhost:8000/";

export const register =  async (data: Object)=> {
    try{
        const res = await fetch(`${productUrl}/register`,
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            }
        )
        const result = await res.json();

        if (res.ok){
            return {success: true, message: result.message || "Registration successful"}
        } else {
            return {success: false, error: result.message || "Unknown error"}
        }
    }
    catch (error){
        return {success: false, error: error || "Network or unknown error"}
    }
}