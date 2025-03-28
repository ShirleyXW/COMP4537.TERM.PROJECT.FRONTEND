import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { deleteKey, updateKeyStatus } from "@/lib/api";
import type { APITable } from "~/routes/userDashboard";


export function APIContainer({ initialData, userId, onStatusUpdate }: { initialData: APITable[], userId: number , onStatusUpdate:(updatedData: APITable[]) => void }) {
    const [data, setData] = useState<APITable[]>(initialData);

    const switchStatus = async (row: APITable) => {
        try {
            const change_status = await updateKeyStatus(row.key, row.status, userId);
            if (change_status?.success) {
                // Update the status in the local state
                const newStatus = row.status === "active" ? "inactive" as "inactive": "active" as "active";
                const updatedData = data.map((item) =>
                    item.key === row.key ? { ...item, status: newStatus } : item
                );
                setData(updatedData);
                onStatusUpdate(updatedData);
            }   else {  
                console.error("Failed to update status:", change_status?.error);
            }
        }catch (error) {
            console.error("Failed to update status:", error);
        }

    };
    const handleApiDelete = async (key: string, deleteKeyId: number) => {
        try {
            const result = await deleteKey(key, deleteKeyId);
            if (result?.success) {
                setData((prevData) => {
                    const updatedApiKeys = prevData.filter((item) => item.key !== key);
                    // localStorage.setItem("apiKeys", JSON.stringify(updatedApiKeys));
                    return updatedApiKeys;
                }
            );
            } else {
                console.error("Failed to delete API key:", result?.error);
            }
        } catch (error) {
            console.error("Failed to delete API key:", error);
        }
    };
    useEffect(() => {
        console.log("Updated data in api container:", data);
    }, [data]);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Key Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                { data.length>0 && (
                    <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell>{row.key}</TableCell>
                            <TableCell>{row.key_name}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell className="flex flex-row">
                                <div className="toggle_status_btn text-green-500 mx-2 flex items-center">
                                    <Switch
                                        checked={row.status === "active"}
                                        onCheckedChange={() => { switchStatus(row) }} />
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger className="font-extrabold border solid gray p-1 w-6">X</AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your api key remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className="bg-gradient-to-br from-blue-500 to-pink-400" onClick={()=>handleApiDelete(row.key, row.action.deleteKey)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                )}
            </Table>
        </>
    );

}