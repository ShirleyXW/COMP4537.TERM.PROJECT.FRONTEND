import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Users, Lightbulb } from "lucide-react";
import { fetchUser, fetchApiKeys } from "~/lib/userDashboard";
import { APIContainer } from "components/APITable";
import { APIGenerate } from "components/APIGenerate";
import { DashboardHeader } from "components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import LoadingSpinner from "components/LoadingSpinner";
import toast from "react-hot-toast";
import { fetchUserUsage } from "~/lib/userDashboard";
import type { UserUsage, User } from "~/lib/userDashboard";

export type APITable = {
    key: string;
    status: "active" | "deactive" | "pending";
    action: {
        toggleStatus: string;
        deleteKey: number;
    };
};
const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiKeys, setApiKeys] = useState<APITable[]>([]);
    const [usage, setUsage] = useState<UserUsage | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // user infomation
                const userData: User = await fetchUser();
                setUser(userData);

                // usage information
                const usageData: UserUsage = await fetchUserUsage();
                setUsage(usageData);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    toast.error(
                        "Authentication error: Your session has expired. Please log in again."
                    );
                    navigate("/");
                    return;
                }
                throw error;
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    useEffect(() => {
        const savedApiKeys = localStorage.getItem("apiKeys");
        if (savedApiKeys) {
            setApiKeys(JSON.parse(savedApiKeys));
        } else {
            const fetchKeys = async () => {
                if (!user) return;
                console.log("fetching keys");
                try {
                    const keys = await fetchApiKeys(user.user_id);
                    setApiKeys(keys);
                } catch (error) {
                    console.error("Failed to fetch keys");
                }
            };
            fetchKeys();
        }
    }, [user]);

    useEffect(() => {
        console.log("apiKeys updated:", apiKeys);
        if (apiKeys.length > 0) {
            localStorage.setItem("apiKeys", JSON.stringify(apiKeys));
        }
    }, [apiKeys]);

    useEffect(() => {
        const savedApiKeys = localStorage.getItem("apiKeys");
        if (savedApiKeys) {
            setApiKeys(JSON.parse(savedApiKeys));
        }
    }, []);

    const handleApiKeyStatusChange = async (updatedData: APITable[]) => {
        setApiKeys(updatedData);
    };

    if (loading || !user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="pb-6">
            <DashboardHeader title="User Dashboard" />

            <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* User Information Card */}
                <Card className="p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                User Information
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                Account details
                            </CardDescription>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">Name:</span>{" "}
                            {user?.username || "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Email:
                            </span>{" "}
                            {user?.email || "N/A"}
                        </p>
                    </CardContent>
                </Card>

                {/* Remaining Requests Card */}
                <Card className="p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle className="font-semibold text-gray-900 dark:text-white">
                                # of Requests / Request Limit
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                API usage status
                            </CardDescription>
                        </div>
                        <div className="bg-yellow-100 dark:bg-blue-800 p-3 rounded-full">
                            <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-blue-300" />
                        </div>
                    </CardHeader>
                    <CardContent className="">
                        <p className="text-4xl font-bold text-green-600 dark:text-green-400 ">
                            {usage?.total_used} / {usage?.remaining_requests ?? "--"}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-red-100">
                {apiKeys.length > 0 && (
                    <APIContainer initialData={apiKeys} onStatusUpdate={handleApiKeyStatusChange} />
                )}
                {user && <APIGenerate userId={user.user_id} setApiKeys={setApiKeys} />}
            </div>
        </div>
    );
};

export default UserDashboard;
