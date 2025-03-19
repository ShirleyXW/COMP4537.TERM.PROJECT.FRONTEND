import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface AdminData {
    name: string;
    email: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    consumedAP: number;
    remaining_requests: number;
}

const AdminDashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const users: User[] = [];

    return (
        <div className="p-6">
            {/* タイトル */}
            <h1 className="text-3xl font-bold text-white bg-rose-500 p-4 rounded-lg text-center shadow-md">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                            Requests left for this period
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* User AP Monitoring */}
            <Card className="mt-6 p-6 rounded-lg shadow-lg  dark:bg-gray-900 dark:text-gray-100">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        User AP Monitoring
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Monitor user API consumption.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {users.length === 0 ? (
                        <div className="text-gray-500 dark:text-gray-400">
                            No user data available.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between py-3"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-rose-600 dark:text-rose-400">
                                        {user.consumedAP} AP
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
