import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
        deviceName: "RGBIC TV Light Bars",
        controllable: true,
        properties: { colorTem: { range: { min: 2000, max: 9000 } } },
        retrievable: true,
        supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
    {
        device: "F0:72:D6:94:C1:86:73:2A",
        model: "H6046",
        deviceName: "RGBIC TV Light Bars",
        controllable: true,
        properties: { colorTem: { range: { min: 2000, max: 9000 } } },
        retrievable: true,
        supportCmds: ["turn", "brightness", "color", "colorTem"],
    },
];

const connect = () => {
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
    return (
        <div className="w-full">
            <div className="flex flex-col gap-10 w-full">
                {/* <h1 className="text-3xl font-bold">
                    {isAPIVerified ? "Your API Key registered" : "Enter your device API key"}
                </h1> */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="api-key">
                        {isAPIVerified ? "Your API Key registered" : "Enter your device API key"}
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
                                <p className="text-sm text-red-500 ml-1">API Key is required</p>
                            )}
                        </div>
                        <Button onClick={isAPIVerified ? handleChange : handleSubmit}>
                            {isAPIVerified ? "Change" : "Submit"}
                        </Button>
                    </div>
                </div>
                <Separator />
                <h2 className="text-2xl font-bold">
                    Select One of Your Device That You Want to Control
                </h2>
                <div className="mt-7 gap-5 grid md:grid-cols-2">
                    {mockDeviceData.map((device, idx) => {
                        return (
                            <Card
                                key={idx}
                                className="hover-click-animation"
                                onClick={() => setSelectedDevice(device)}
                            >
                                <CardHeader>
                                    <CardTitle>{`${device.deviceName} (${device.model})`}</CardTitle>
                                    <CardDescription>{`${device.device}`}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="flex max-w-lg gap-2">
                                            <p>Supported: </p>
                                            <p>{`${device.controllable ? "YES" : "NO"}`}</p>
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
            </div>
        </div>
    );
};
export default connect;
