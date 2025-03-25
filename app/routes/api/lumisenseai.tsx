import APIKeyCheck from "components/APIKeyCheckForm";
import { FaRegLightbulb } from "react-icons/fa";
import { LuLampDesk } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MdLinkOff, MdAddLink, MdLightbulb } from "react-icons/md";

import "./animation.css";
import { Separator } from "@/components/ui/separator";
const INTERVAL = 2000;
const COLOR_CLASS = [
    "text-custom-gray",
    "text-custom-purple",
    "text-custom-pink",
    "text-custom-blue",
    "text-custom-coral-pink",
];
const LumiSenseAI = () => {
    const navigate = useNavigate();
    const [isKeyChecked, setIsKeyChecked] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const storedDevice = localStorage.getItem("selectedDevice");
        if (storedDevice) {
            setSelectedDevice(JSON.parse(storedDevice));
        }
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % COLOR_CLASS.length);
        }, INTERVAL);
        return () => clearInterval(interval);
    }, []);

    if (!isKeyChecked) return <APIKeyCheck />;
    return (
        <div className="w-full min-h-screen flex flex-col max-h-screen">
            <h1 className="text-3xl font-bold text-center">Lumi Sense AI</h1>
            {selectedDevice && (
                <div className="w-full md:px-10 flex flex-col justify-center items-center mt-10 gap-5">
                    <h2 className="text-xl font-semibold">You're currently connected to:</h2>
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>{`${selectedDevice.deviceName} (${selectedDevice.model})`}</CardTitle>
                                <CardDescription>{`${selectedDevice.device}`}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className="flex max-w-lg gap-2">
                                        <p>Supported: </p>
                                        <p>
                                            {selectedDevice.controllable
                                                ? "Yes, ready to control!"
                                                : "Not controllable at the moment."}
                                        </p>
                                    </div>
                                    <div className="flex max-w-lg gap-2">
                                        <p>Possible Action: </p>
                                        {selectedDevice.supportCmds.map((cmd: any, idx: number) => {
                                            return <p key={`${cmd}_${idx}`}>{cmd}</p>;
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Separator className="mt-10" />
                </div>
            )}

            <div className="w-full grid md:grid-cols-2 gap-10 gap-y-5 md:px-10 mt-10">
                <Card
                    className="hover-click-animation"
                    onClick={() => navigate("/lumisenseai/connect")}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>Connect a Device</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Tap here to select a smart lamp you'd like to use.
                            </CardContent>
                        </div>
                        <p className="mr-10">
                            <MdAddLink size={50} />
                        </p>
                    </div>
                </Card>
                <Card
                    className="hover-click-animation"
                    onClick={() => {
                        window.localStorage.removeItem("selectedDevice");
                        setSelectedDevice(null);
                    }}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>Disconnect Device</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Not this one? Tap to remove the connected device.
                            </CardContent>
                        </div>
                        <p className="mr-10">
                            <MdLinkOff size={50} />
                        </p>
                    </div>
                </Card>
                <Card
                    className="hover-click-animation md:col-span-2"
                    onClick={() => navigate("/lumisenseai/control")}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>Control Your Lamp</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Customize brightness, color, and more in real time!
                            </CardContent>
                        </div>
                        <p className="mr-10">
                            <MdLightbulb
                                size={50}
                                className={`transition-colors duration-1000 ease-in-out ${COLOR_CLASS[colorIndex]}`}
                            />
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LumiSenseAI;
