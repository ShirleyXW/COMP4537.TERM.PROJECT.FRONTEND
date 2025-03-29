import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { fetchUserId } from "~/lib/user";

export const useAuth = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const id = await fetchUserId();
                setUserId(id);
            } catch (error) {
                setUserId(null);
                navigate("/", {
                    state: { from: location },
                    replace: true,
                });
            } finally {
                setLoading(false);
            }
        } 
        loadUserId();
    }, [navigate, location]);
    return { userId, loading };
}
