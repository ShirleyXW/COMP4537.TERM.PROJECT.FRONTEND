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
import { deleteKey } from "@/lib/api";

export type APITable = {
    key: string;
    status: "active" | "deactive" | "pending";
    action: {
        toggleStatus: string;
        deleteKey: number;
    };
}

export function APIContainer({ initialData }: { initialData: APITable[] }) {
    const [data, setData] = useState<APITable[]>(initialData);

    const switchStatus = (row: APITable) => {
        const newStatus = row.status === "active" ? "deactive" : "active";

        setData((prevData) =>
            prevData.map((item) =>
                item.key === row.key ? { ...item, status: newStatus } : item
            )
        );
    };
    const handleApiDelete = async (key: string, deleteKeyId: number) => {
        try {
            const result = await deleteKey(key, deleteKeyId);
            if (result?.success) {
                setData((prevData) => prevData.filter((item) => item.key !== key));
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

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell>{row.key}</TableCell>
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
            </Table>
        </>
    );

}