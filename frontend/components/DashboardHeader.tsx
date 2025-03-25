"use client";
import { useState } from "react";
import { User } from "lucide-react";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiLogOut } from "react-icons/fi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    title?: string;
    userImage?: string;
    isAdmin?: boolean;
}
import { logout } from "@/lib/auth";
import { useNavigate } from "react-router";

export function DashboardHeader({ title = "Dashboard", userImage, isAdmin = false }: HeaderProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await toast.promise(logout(), {
                loading: "Logging out...",
                success: <b>Logged out successfully!</b>,
                error: <b>Logout failed.</b>,
            });
            navigate("/");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header
            className={`w-full h-16 border-b bg-gradient-to-br flex items-center px-4 ${
                isAdmin
                    ? "from-rose-400 to-rose-200" // For admins
                    : "from-blue-400 to-blue-200" // For users
            }`}
        >
            <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
                <div className="w-10" />

                <h1 className="text-xl text-white font-semibold">{title}</h1>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={userImage} alt="User" />
                            <AvatarFallback>
                                <User className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                navigate(`/${isAdmin ? "adminDashboard" : "userDashboard"}`)
                            }
                        >
                            <div className="w-full h-fit flex justify-center items-center gap-3">
                                <p className="font-bold text-blue-500">Dashboard</p>
                                <p className="text-blue-500">
                                    <FiLogOut className="text-blue-500 font-bold" />
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/lumisenseai")}>
                            <div className="w-full h-fit flex justify-center items-center gap-3">
                                <p className="font-bold text-blue-500">Lumi Sense AI</p>
                                <p className="text-blue-500">
                                    <FiLogOut className="text-blue-500 font-bold" />
                                </p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                            <div className="w-full h-fit flex justify-center items-center gap-3">
                                <p className="font-bold text-blue-500">LOGOUT</p>
                                <p className="text-blue-500">
                                    <FiLogOut className="text-blue-500 font-bold" />
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
