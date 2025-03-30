import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { fetchUser } from "~/lib/user";
import { API_BASE_URL } from "~/lib/api";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const LumisenseAIKeyCheck = () => {
    const { loading } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        const storedKey = localStorage.getItem("selectedKey");
        if (storedKey) {
            navigate("/lumisenseai");
        }
    }, []);
    const [allKeys, setAllKeys] = useState([]);
    const [selectedKey, setSelectedKey] = useState({});
    const fetchAllAPIKey = async () => {
        try {
            const user = await fetchUser();
            const response = await fetch(`${API_BASE_URL}/api/get-key?user_id=${user.user_id}`);
            console.log(`${API_BASE_URL}/get-key`);
            if (!response.ok) {
                throw new Error("Server didn't respond.");
            }
            const data = await response.json();
            setAllKeys(data.keys);
        } catch (error) {
            console.log("Error during fetching keys: ", error);
        }
    };

    useEffect(() => {
        fetchAllAPIKey();
    }, []);
    if (!allKeys) return loading;
    return (
        <div className="bg-custom-gray flex h-screen w-full flex-col items-center justify-center">
            <Card className="w-full max-w-[800px] md:w-3/4">
                <CardHeader>
                    <CardTitle>Register API Key</CardTitle>
                    <CardDescription className="">
                        Select your API key from below to access the Lumi Sense AI services.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex w-full flex-col items-end gap-5 space-x-2 md:flex-row md:items-center md:gap-0">
                        <Select onValueChange={(value) => setSelectedKey(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select API Key you want to use." />
                            </SelectTrigger>
                            <SelectContent>
                                {allKeys.map((key: any) => {
                                    return (
                                        <SelectItem key={key.key_name} value={key.key}>
                                            <div className="w-full flex gap-5">
                                                <p>{key.key_name}</p>
                                                <p>{key.key}</p>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <Button
                            className="mr-2 md:mr-0"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                const finalSelectedKey = allKeys.filter(
                                    (key: any) => key.key == selectedKey
                                );
                                const keyToStore = JSON.stringify(finalSelectedKey[0]);
                                console.log(keyToStore);
                                window.localStorage.setItem("selectedKey", keyToStore);
                                navigate("/lumisenseai");
                            }}
                        >
                            Select
                        </Button>
                    </form>
                </CardContent>
                <Separator />
                <CardFooter>
                    <div className="flex w-full flex-col items-end gap-5">
                        <div className="flex w-full flex-col items-end">
                            <p className="text-muted-foreground text-sm">
                                Don’t have an API key yet?
                            </p>
                            <Button variant="link">
                                <p>Create one here</p>
                            </Button>
                        </div>
                        <div className="flex w-full flex-col items-end">
                            <p className="text-muted-foreground text-sm">Forgot your API key?</p>
                            <Button variant="link" className="text-[#F472B6]">
                                <p>Recover it here</p>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LumisenseAIKeyCheck;
