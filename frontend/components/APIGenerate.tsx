
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { generateApiKey } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { APITable } from "~/routes/userDashboard";
import { useState } from "react";

interface APIGenerateProps {
    userId: number;
    setApiKeys: React.Dispatch<React.SetStateAction<APITable[]>>;
  }

export function APIGenerate ({userId, setApiKeys}: APIGenerateProps) {
    const [keyName, setKeyName] = useState<string>("");

    const generateKey = async () => {
        try {
            const result = await generateApiKey(userId, keyName);
            if (result?.success) {
                const updatedData = {
                    key: result.key,
                    key_name: keyName,
                    status: "active" as "active",
                    action: {
                        toggleStatus: "Toggle Status",
                        deleteKey: userId,
                    }
                }
                setApiKeys((prevData) => [...prevData, updatedData]);
            }
        }
        catch (error) {
            console.error("Failed to generate key");
        }
    };
    
    return (
        <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Create Key
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="hover:bg-transparent">
                        <TableCell>
                            <Input placeholder="Enter Key Name" value={keyName} onChange={(e) => setKeyName(e.target.value)}/>
                        </TableCell>
                        <TableCell>
                            <Button className="bg-gradient-to-br from-blue-500 to-blue-300 rounded w-20 h-8 hover:from-blue-900 hover:to-blue-400" onClick={()=>generateKey()}>Generate</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
                
    );
}