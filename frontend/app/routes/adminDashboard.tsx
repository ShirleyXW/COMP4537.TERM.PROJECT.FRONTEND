import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAdmin } from "~/lib/admin";
import { Users } from "lucide-react";
import { DashboardHeader } from "components/DashboardHeader";
import LoadingSpinner from "components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";

interface Admin {
  user_id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

interface User {
  user_id: number;
  username: string;
  email: string;
  consumedAP: number;
  remaining_requests: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<Admin>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const adminData = await fetchAdmin();
        setAdmin(adminData);
        setUsers([]);
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
    <div className="p-6">
      <DashboardHeader title="Admin Dashboard" />

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
              <span className="font-medium text-gray-900 dark:text-white">
                Name:
              </span>{" "}
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
                  key={user.user_id}
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
