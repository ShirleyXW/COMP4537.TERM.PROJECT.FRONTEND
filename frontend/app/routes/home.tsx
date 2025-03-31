import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { Header } from "../../components/Header";
import { getIsAdmin } from "~/lib/admin";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LoadingSpinner from "components/LoadingSpinner";
import { metaMessage, routers, errorMessage } from "~/lang/landing/en";

export const meta = ({}: Route.MetaArgs) => {
    return [{ title: metaMessage.title }, { name: metaMessage.name, content: metaMessage.content }];
};

const Home = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState<boolean | null>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const isAdminData = await getIsAdmin();
                setIsAdmin(isAdminData);

                if (isAdminData) {
                    navigate(routers.admin);
                } else if (isAdminData == false) {
                    navigate(routers.user);
                }
            } catch (error) {
                console.error(errorMessage.redirectError, error);
            } finally {
                setLoading(false);
            }
        };
        checkRedirect();
    }, [navigate]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Header />
        </>
    );
};

export default Home;
