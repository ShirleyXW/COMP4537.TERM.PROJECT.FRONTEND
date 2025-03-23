import type { Route } from "./+types/home";
import { Header } from "../../components/Header";
import { getIsAdmin } from "~/lib/admin";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LoadingSpinner from "components/LoadingSpinner";

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: "Lumisenseai" },
        { name: "description", content: "Welcome to React Router!" },
    ];
};

const Home = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState<boolean | null>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const isAdminData = await getIsAdmin();
                setIsAdmin(isAdminData)

                console.log(isAdmin)

                if (isAdmin) {
                    navigate("/adminDashboard");
                } else if (isAdmin == false) {
                    navigate("/userDashboard");
                }
            } catch (error) {
                console.error("Failed to check redirect", error);
            } finally {
                setLoading(false);
            }
        }
        checkRedirect();
    }, [navigate])

    if (loading) {
        return <LoadingSpinner />
    }

    return (
    <>
    <Header />
    </>
);
};

export default Home;
