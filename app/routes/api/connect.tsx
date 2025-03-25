import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";

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
    const handleSubmit = () => {
        setIsAPIVerified(true);
        setAPIKey(APIKey);
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
                <div className="grid w-full max-w-lg items-center gap-1.5">
                    <Label htmlFor="api-key">
                        {isAPIVerified ? "Your API Key registered" : "Enter your device API key"}
                    </Label>
                    <div className="flex gap-5">
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
                        <Button onClick={isAPIVerified ? handleChange : handleSubmit}>
                            {isAPIVerified ? "Change" : "Submit"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default connect;
