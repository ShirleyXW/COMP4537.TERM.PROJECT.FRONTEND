import type { Route } from "./+types/home";
import { Header } from "../../components/Header";

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: "Lumisenseai" },
        { name: "description", content: "Welcome to React Router!" },
    ];
};

const Home = () => {
    return (
    <>
    <Header />
    </>
);
};

export default Home;
