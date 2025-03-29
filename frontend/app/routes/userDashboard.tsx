import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Users, Lightbulb } from "lucide-react";
import { fetchApiKeys } from "~/lib/userDashboard";
import { fetchUser } from "~/lib/user";
import { APIContainer } from "components/APITable";
import { APIGenerate } from "components/APIGenerate";
import { DashboardHeader } from "components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import LoadingSpinner from "components/LoadingSpinner";
import toast from "react-hot-toast";
import { fetchUserUsage } from "~/lib/userDashboard";
import type { UserUsage } from "~/lib/userDashboard";
import type { User } from "~/lib/user";
import { ui, messages } from "~/lang/user_dashboard/en"

export type APITable = {
    key: string;
    key_name: string;
    status: "active" | "inactive" | "pending";
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
                        (messages.authError)
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
        const fetchKeys = async () => {
          if (!user) return;
          console.log(messages.fetchingKey);
          try {
            const keys = await fetchApiKeys(user.user_id);
            const formattedKeys = keys.map((key) => ({
                ...key,
                status: key.status as "active" | "inactive" | "pending",
            }));
            setApiKeys(formattedKeys);
          } catch (error) {
            console.error(messages.fetchKeysError);
          }
        };
        fetchKeys();
        
    }, [user]);

    const handleApiKeyStatusChange = async (updatedData: APITable[]) => {
        setApiKeys(updatedData);
    };

    if (loading || !user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="pb-6">
            <DashboardHeader title={ui.dashboardHeader} />

            <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* User Information Card */}
                <Card className="p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                {ui.userInfoTitle}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                {ui.userInfoDescription}
                            </CardDescription>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">{ui.nameLabel}</span>{" "}
                            {user?.username || ui.notApplicable}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                                {ui.emailLabel}
                            </span>{" "}
                            {user?.email || ui.notApplicable}
                        </p>
                    </CardContent>
                </Card>

                {/* Remaining Requests Card */}
                <Card className="p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle className="font-semibold text-gray-900 dark:text-white">
                                {ui.usageTitle}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                {ui.usageDescription}
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
            <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                
                <div className="col-span-3">
                    <APIContainer initialData={apiKeys} userId={user.user_id} onStatusUpdate={handleApiKeyStatusChange} />
                </div>
                
                {user && <APIGenerate userId={user.user_id} setApiKeys={setApiKeys} />}
            </div>
        </div>
    );
};

export default UserDashboard;
