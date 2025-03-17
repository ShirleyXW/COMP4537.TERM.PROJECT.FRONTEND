import React, { useEffect, useState } from "react";
import { Users} from "lucide-react";
import { fetchUser } from "~/lib/userDashboard";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface User {
    user_id: number;
    email: string;
    username: string;
    is_admin: boolean;
}

const userDashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;


    return (
        <div className="p-6">
            <h1 className="text-3xl p-4">User Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 shadow-lg">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="">User Information</CardTitle>
                        <Users className="w-5 h-5 text-gray-500" />
                    </CardHeader>
                    <CardContent className="flex items-center space-x-4">
                        <div>
                            <p className="">Name: {user.username}</p>
                            <p className="">Email: {user.email}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-4 shadow-lg">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Remaining Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <p className="text-2xl font-bold">{userData?.remainingRequests}</p> */}
                        <CardDescription>You have requested # times so far</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
        
    )
};

export default userDashboard;