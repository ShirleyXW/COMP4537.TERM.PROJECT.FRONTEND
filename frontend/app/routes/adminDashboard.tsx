import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAdmin } from "~/lib/admin";
import { Users } from "lucide-react";
import { DashboardHeader } from "components/DashboardHeader";
import LoadingSpinner from "components/LoadingSpinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { User } from "~/lib/userDashboard";
import type { Admin } from "~/lib/admin";
import { fetchUserBreakdown } from "~/lib/adminDashboard";
import { KeyRound } from "lucide-react";

interface UserStats {
    username: string;
    email: string;
    token?: string[];
    totalRequests: number;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<Admin>();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [userStats, setUserStats] = useState<UserStats[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const adminData = await fetchAdmin();
                setAdmin(adminData);
                // setUsers([]);
                const data = await fetchUserBreakdown();
                setUserStats(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const status_code = error.response?.status;
                    if (status_code === 401) {
                        toast.error(
                            "Authentication error: Your session has expired. Please log in again."
                        );
                        navigate("/");

                        return;
                    } else if (status_code === 403) {
                        toast.error(
                            "Access denied: You do not have permission to access this page."
                        );
                        navigate("/userDashboard");
                        return;
                    }
                }
                throw error;
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [navigate]);

    if (loading || !admin) {
        return <LoadingSpinner />;
    }

    return (
        <div className="pb-6">
            <DashboardHeader title="Admin Dashboard" isAdmin={true} />

            <div className="gap-6 mt-6 px-6">
                {/* Admin Information Card */}
                <Card className="p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                Admin Information
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                Account details
                            </CardDescription>
                        </div>
                        <div className="bg-rose-100 dark:bg-rose-800 p-3 rounded-full">
                            <Users className="w-6 h-6 text-rose-600 dark:text-rose-300" />
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">Name:</span>{" "}
                            {admin?.username || "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Email:
                            </span>{" "}
                            {admin?.email || "N/A"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-20 px-6">
                <h1 className="text-2xl font-bold text-gray-500">Stats for each endpoints</h1>
                <Table className="mt-3">
                    <TableHeader className="bg-gradient-to-b from-rose-100 to-rose-150">
                        <TableRow>
                            <TableHead className="text-gray-600">Method</TableHead>
                            <TableHead className="text-gray-600">Endpoint</TableHead>
                            <TableHead className="text-gray-600">Requests</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="fonr-medium">PUT</TableCell>
                            <TableCell className="font-medium">hardcoded/endpoint/</TableCell>
                            <TableCell className="font-medium">78(hardcoded number)</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="mt-20 px-6">
                <h1 className="text-2xl font-bold text-gray-500">
                    Breakdown of API usages per user
                </h1>
                <Table className="mt-3">
                    <TableHeader className="bg-gradient-to-b from-rose-100 to-rose-150">
                        <TableRow>
                            <TableHead className="text-gray-600">User Name</TableHead>
                            <TableHead className="text-gray-600">Email</TableHead>
                            <TableHead className="text-gray-600">Token / API Key</TableHead>
                            <TableHead className="text-gray-600">Total # Requests</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userStats.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No user data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            userStats.map((user, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="">{user.username}</TableCell>
                                    <TableCell className="font-medium">{user.email}</TableCell>
                                    <TableCell className="font-medium whitespace-normal">
                                        {user.token?.length
                                            ? user.token.map((keyString, i) => (
                                                  <li
                                                      className="list-none flex items-start gap-2"
                                                      key={i}
                                                  >
                                                      <KeyRound className="h-4 w-4 text-rose-300" />
                                                      <span>{keyString}</span>
                                                  </li>
                                              ))
                                            : ""}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.totalRequests}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminDashboard;
