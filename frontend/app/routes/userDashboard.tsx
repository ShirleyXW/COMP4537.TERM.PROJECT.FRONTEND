import { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router";
import { Users } from "lucide-react";
import { fetchUser, fetchApiKeys } from "~/lib/userDashboard";
import { APIContainer } from "components/APITable";
import { APIGenerate } from "components/APIGenerate";
import { DashboardHeader } from "components/DashboardHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

export const loader = async () => {
  try {
    const user = await fetchUser();
    return { user };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return redirect("/");
    }

    throw error;
  }
};

const UserDashboard = () => {
  const { user } = useLoaderData<typeof loader>();

  // if (loading) return <p>Loading...</p>;
  // if (!user) return <p>User not found</p>;
  const [apiKeys, setApiKeys] = useState([]);
  
  useEffect(() => {
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
  }, [user]); 

  useEffect(() => {
    console.log("apiKeys updated:", apiKeys);
  }, [apiKeys]);

  return (
    <div className="p-6">
      <DashboardHeader title="User Dashboard" />

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
              <span className="font-medium text-gray-900 dark:text-white">
                Name:
              </span>{" "}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {apiKeys.length > 0 && <APIContainer initialData={apiKeys} />}
        {user && <APIGenerate userId={user.user_id} />}
      </div>
    </div>
  );
};

export default UserDashboard;
