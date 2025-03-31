import { useState } from "react";
import { useNavigate } from "react-router";
import _ from "lodash";

import { API_BASE_URL } from "~/lib/api";
import { messages } from "@/lang/api/connect/en";

import { useAuth } from "~/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "components/DashboardHeader";
import LoadingSpinner from "components/LoadingSpinner";

import "./animation.css";

const connect = () => {
    const { loading } = useAuth();
    const navigate = useNavigate();

    const [isAPIVerified, setIsAPIVerified] = useState(false);
    const [APIKey, setAPIKey] = useState("");
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [devices, setDevices] = useState<any>([]);
    const [isEmptyAPIKey, setIsEmptyAPIKey] = useState(false);
    const fetchDevice = async () => {
        const response = await fetch(`${API_BASE_URL}/lumisenseai/get-devices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goveeKey: APIKey.trim(),
            }),
        });
        if (!response.ok) {
            console.error("Failed to fetch device: ", response.status);
        }
        const data = await response.json();
        setDevices(data.data.devices);
        setIsAPIVerified(true);
        setAPIKey(APIKey);
        setIsEmptyAPIKey(false);
        console.log(data);
    };
    const handleSubmit = (e: any) => {
        if (APIKey.length <= 0) {
            setIsEmptyAPIKey(true);
            return;
        }
        window.localStorage.setItem("goveeKey", APIKey);
        fetchDevice();
    };
    const handleChange = () => {
        setIsAPIVerified(false);
        setAPIKey("");
    };
    const handleFinalSelect = () => {
        try {
            window.localStorage.setItem("selectedDevice", JSON.stringify(selectedDevice));
            navigate("/lumisenseai");
        } catch (error) {
            console.error("Error during storing selected device: ", error);
        }
    };
    if (loading) return <LoadingSpinner />;
    return (
        <div className="w-full pb-10">
            <DashboardHeader title="Lumi Sense AI" />
            <div className="flex flex-col gap-10 w-full mt-10">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="api-key">
                        {isAPIVerified
                            ? messages.goveeKeyPrompt.afterVerify
                            : messages.goveeKeyPrompt.beforeVerify}
                    </Label>
                    <div className="flex gap-5 w-full">
                        <div className="flex flex-col flex-grow gap-3">
                            {isAPIVerified ? (
                                <Input value={APIKey} disabled />
                            ) : (
                                <Input
                                    id="api-key"
                                    type="text"
                                    placeholder={messages.goveeKeyPrompt.placeholder}
                                    required
                                    value={APIKey}
                                    onChange={(e) => setAPIKey(e.target.value)}
                                />
                            )}
                            {isEmptyAPIKey && (
                                <p className="text-sm text-red-500 ml-1">
                                    {messages.goveeKeyPrompt.emptyWarning}
                                </p>
                            )}
                        </div>
                        <Button onClick={isAPIVerified ? handleChange : handleSubmit}>
                            {isAPIVerified
                                ? messages.goveeKeyPrompt.changeBtn
                                : messages.goveeKeyPrompt.verifyBtn}
                        </Button>
                    </div>
                </div>
                <Separator />
                <h2 className="text-2xl font-bold">{messages.pickDeviceTitle}</h2>
                <div className="mt-7 ">
                    <div className="gap-5 grid md:grid-cols-2">
                        {devices.length > 0 ? (
                            devices.map((device: any, idx: any) => {
                                return (
                                    <Card
                                        key={idx}
                                        className={`hover-click-animation ${_.isEqual(device, selectedDevice) && "bg-red-200"} ${!device.controllable && "cursor-not-allowed"}`}
                                        onClick={() => {
                                            if (device.controllable)
                                                setSelectedDevice((prev: any) => {
                                                    if (!_.isEqual(device, selectedDevice))
                                                        return device;
                                                    if (!prev) return device;
                                                    else return null;
                                                });
                                        }}
                                    >
                                        <CardHeader>
                                            <CardTitle>{`${device.deviceName} (${device.model})`}</CardTitle>
                                            <CardDescription>{`${device.device}`}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <div className="flex max-w-lg gap-2">
                                                    <p>{messages.deviceCard.supportedLabel}</p>
                                                    <p>
                                                        {device.controllable
                                                            ? messages.deviceCard.supportedYes
                                                            : messages.deviceCard.supportedNo}
                                                    </p>
                                                </div>
                                                <div className="flex max-w-lg gap-2">
                                                    <p>{messages.deviceCard.actionsLabel}</p>
                                                    {device.supportCmds.map(
                                                        (cmd: any, idx: any) => {
                                                            return (
                                                                <p key={`${cmd}_${idx}`}>{cmd}</p>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <p className="text-lg">{messages.noDeviceFound}</p>
                        )}
                    </div>
                    <div className="mt-10">
                        <Button
                            className={`h-15 w-full bg-custom-purple hover:bg-custom-purple hover-click-animation font-bold text-2xl text-custom-gray`}
                            disabled={!selectedDevice}
                            onClick={handleFinalSelect}
                        >
                            {messages.connectButton}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default connect;
