import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";

import _ from "lodash";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import "./animation.css";
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
    const navigate = useNavigate();

    const [isAPIVerified, setIsAPIVerified] = useState(false);
    const [APIKey, setAPIKey] = useState("");
    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [isEmptyAPIKey, setIsEmptyAPIKey] = useState(false);
    const handleSubmit = (e: any) => {
        if (APIKey.length <= 0) {
            setIsEmptyAPIKey(true);
            return;
        }
        setIsAPIVerified(true);
        setAPIKey(APIKey);
        setIsEmptyAPIKey(false);
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
    return (
        <div className="w-full">
            <div className="flex flex-col gap-10 w-full">
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
                        {mockDeviceData.map((device, idx) => {
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
                                                {device.supportCmds.map((cmd, idx) => {
                                                    return <p key={`${cmd}_${idx}`}>{cmd}</p>;
                                                })}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
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
