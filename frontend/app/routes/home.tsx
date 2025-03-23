import type { Route } from "./+types/home";
import { Header } from "../../components/Header";
import { getIsAdmin } from "~/lib/admin";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: "Lumisenseai" },
        { name: "description", content: "Welcome to React Router!" },
    ];
};

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const isAdmin = await getIsAdmin();

                console.log(isAdmin)

                if (isAdmin) {
                    navigate("/adminDashboard");
                } else if (isAdmin == false) {
                    navigate("/userDashboard");
                }
            } catch (error) {
                console.error("Failed to check redirect", error);
            }
        }
        checkRedirect();
    }, [navigate])

    return (
    <>
    <Header />
    </>
);
};

export default Home;
