import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { fetchUser } from "~/lib/userDashboard";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface User {
    user_id: number;
    email: string;
    username: string;
    is_admin: boolean;
    remaining_requests?: number;
}

const UserDashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                console.log(userData)
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // if (loading) return <p>Loading...</p>;
    // if (!user) return <p>User not found</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white bg-blue-500 p-4 rounded-lg text-center shadow-md">
                User Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                            <span className="font-medium text-gray-900 dark:text-white">Name:</span> {user?.username || "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">Email:</span> {user?.email || "N/A"}
                        </p>
                    </CardContent>
                </Card>

                {/* Remaining Requests Card */}
                <Card className="p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                Remaining Requests
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                API usage status
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <p className="text-4xl font-bold text-green-600 dark:text-green-400 text-center">
                            {user?.remaining_requests ?? "--"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                            You have requested # times so far
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserDashboard;
