import type { Route } from "./+types/home";
import { LoginForm } from "components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: "Login - Your App" },
        { name: "description", content: "Login to access your account" },
    ];
};

const Login = () => {

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
