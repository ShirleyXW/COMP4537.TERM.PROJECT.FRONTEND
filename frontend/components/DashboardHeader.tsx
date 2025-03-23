"use client";
import { useState } from "react";
import { User } from "lucide-react";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title?: string;
  userImage?: string;
}
import { logout } from "@/lib/auth";
import { useNavigate } from "react-router";

export function DashboardHeader({
  title = "Dashboard",
  userImage,
}: HeaderProps) {
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
    <header className="w-full h-16 border-b bg-gradient-to-br from-blue-400 to-blue-200 flex items-center px-4">
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
            <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
