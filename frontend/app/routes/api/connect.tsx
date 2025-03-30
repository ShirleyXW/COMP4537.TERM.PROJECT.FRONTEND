import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import LoadingSpinner from "components/LoadingSpinner";

import _ from "lodash";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "./animation.css";
import { DashboardHeader } from "components/DashboardHeader";
import { API_BASE_URL } from "~/lib/api";
const mockDeviceData = [
    {
        device: "F0:72:D6:94:C1:86:73:2A",
        model: "H6046",
        deviceName: "RGBIC TV Light Bars",
        controllable: true,
        properties: { colorTem: { range: { min: 2000, max: 9000 } } },
        retrievable: true,
        supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
        device: "F0:72:D6:94:C1:86:73:2A",
        model: "H6046",
        deviceName: "RGBIC TV Light Bars2",
        controllable: false,
        properties: { colorTem: { range: { min: 2000, max: 9000 } } },
        retrievable: true,
        supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
        device: "F0:72:D6:94:C1:86:73:2A",
        model: "H6046",
        deviceName: "RGBIC TV Light Bars3",
        controllable: true,
        properties: { colorTem: { range: { min: 2000, max: 9000 } } },
        retrievable: true,
        supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
];

const connect = () => {
    const { userId, loading } = useAuth();
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
                            ? "Your Govee API key has been registered!"
                            : "Please enter your device's API key to get started"}
                    </Label>
                    <div className="flex gap-5 w-full">
                        <div className="flex flex-col flex-grow gap-3">
                            {isAPIVerified ? (
                                <Input value={APIKey} disabled />
                            ) : (
                                <Input
                                    id="api-key"
                                    type="text"
                                    placeholder="enter your api key here.."
                                    required
                                    value={APIKey}
                                    onChange={(e) => setAPIKey(e.target.value)}
                                />
                            )}
                            {isEmptyAPIKey && (
                                <p className="text-sm text-red-500 ml-1">
                                    Oops! Please enter your API key.
                                </p>
                            )}
                        </div>
                        <Button onClick={isAPIVerified ? handleChange : handleSubmit}>
                            {isAPIVerified ? "Change Key" : "Verify Key"}
                        </Button>
                    </div>
                </div>
                <Separator />
                <h2 className="text-2xl font-bold">Pick a device you’d like to control</h2>
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
                                                    <p>Supported: </p>
                                                    <p>
                                                        {device.controllable
                                                            ? "Yes, ready to go!"
                                                            : "No, not available for control"}
                                                    </p>
                                                </div>
                                                <div className="flex max-w-lg gap-2">
                                                    <p>Possible Action: </p>
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
                            <p className="text-lg"> No devices found...</p>
                        )}
                    </div>
                    <div className="mt-10">
                        <Button
                            className={`h-15 w-full bg-custom-purple hover:bg-custom-purple hover-click-animation font-bold text-2xl text-custom-gray`}
                            disabled={!selectedDevice}
                            onClick={handleFinalSelect}
                        >
                            Connect This Device
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default connect;
