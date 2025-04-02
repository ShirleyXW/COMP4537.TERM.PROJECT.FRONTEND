import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "~/hooks/useAuth";
import { API_BASE_URL } from "~/lib/api";
import { messages } from "@/lang/api/lumisense_ai_api_key_check/en";
import { fetchUser } from "~/lib/user";
import { DashboardHeader } from "components/DashboardHeader";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
        <div className="">
            <DashboardHeader title={messages.headerTitle} />

            <div className="bg-custom-gray flex h-screen w-full flex-col items-center justify-center">
                <Card className="w-full max-w-[800px] md:w-3/4">
                    <CardHeader>
                        <CardTitle>{messages.page.title}</CardTitle>
                        <CardDescription className="">{messages.page.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex w-full flex-col items-end gap-5 space-x-2 md:flex-row md:items-center md:gap-0">
                            <Select onValueChange={(value) => setSelectedKey(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={messages.page.placeholder} />
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
                                {messages.page.select}
                            </Button>
                        </form>
                    </CardContent>
                    <Separator />
                    <CardFooter>
                        <div className="flex w-full flex-col items-end gap-5">
                            <div className="flex w-full flex-col items-end">
                                <p className="text-muted-foreground text-sm">
                                    {messages.footer.noKey}
                                </p>
                                <Button
                                    variant="link"
                                    className="text-custom-pink"
                                    onClick={() => {
                                        navigate("/userDashboard");
                                    }}
                                >
                                    <p>{messages.footer.createKey}</p>
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LumisenseAIKeyCheck;
