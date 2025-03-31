import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { MdLinkOff, MdAddLink, MdLightbulb } from "react-icons/md";

import LoadingSpinner from "components/LoadingSpinner";
import { DashboardHeader } from "components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "~/hooks/useAuth";
import "./animation.css";
import { messages } from "~/lang/api/lumisenseai/en";

const INTERVAL = 2000;
const COLOR_CLASS = [
    "text-custom-gray",
    "text-custom-purple",
    "text-custom-pink",
    "text-custom-blue",
    "text-custom-coral-pink",
];
const LumiSenseAI = () => {
    const { loading } = useAuth();
    const navigate = useNavigate();
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [colorIndex, setColorIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKey, setSelectedKey] = useState<any>({});
    useEffect(() => {
        const storedAPIKey = localStorage.getItem("selectedKey");
        if (!storedAPIKey) {
            navigate("/lumisenseai/api/key/check");
            return;
        }
        setSelectedKey(JSON.parse(storedAPIKey));
        const storedDevice = localStorage.getItem("selectedDevice");
        if (storedDevice) {
            setSelectedDevice(JSON.parse(storedDevice));
        }
        setIsLoading(false);
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % COLOR_CLASS.length);
        }, INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const [isClosing, setIsClosing] = useState(false);
    const handleDisconnect = () => {
        setIsClosing(true);
        setTimeout(() => {
            localStorage.removeItem("selectedDevice");
            setSelectedDevice(null);
            setIsClosing(false);
        }, 500);
    };
    if (loading || isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen flex flex-col max-h-screen">
            <DashboardHeader title={messages.headerTitle} />
            <Toaster />
            <div className="w-full py-5 flex flex-col items-center ">
                <p>{messages.connectedTo}</p>
                <div className=" w-full flex flex-col justify-center items-center">
                    <div className="flex w-1/2">
                        <p className="w-1/4">{messages.keyName}</p>
                        <p>{selectedKey.key_name}</p>
                    </div>
                    <div className="flex w-1/2">
                        <p className="w-1/4">{messages.key}</p>
                        <p>{selectedKey.key}</p>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {selectedDevice && (
                    <motion.div
                        className="w-full md:px-10 flex flex-col justify-center items-center mt-10 gap-5"
                        layout
                        key="device-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl font-semibold">{messages.connectedDevice}</h2>
                        <div className="w-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{`${selectedDevice.deviceName} (${selectedDevice.model})`}</CardTitle>
                                    <CardDescription>{`${selectedDevice.device}`}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="flex max-w-lg gap-2">
                                            <p>{messages.supported}</p>
                                            <p>
                                                {selectedDevice.controllable
                                                    ? messages.supportedYes
                                                    : messages.supportedNo}
                                            </p>
                                        </div>
                                        <div className="flex max-w-lg gap-2">
                                            <p>{messages.possibleActions}</p>
                                            {selectedDevice.supportCmds.map(
                                                (cmd: any, idx: number) => {
                                                    return <p key={`${cmd}_${idx}`}>{cmd}</p>;
                                                }
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Separator className="mt-10" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div layout className="w-full grid md:grid-cols-2 gap-10 gap-y-5 md:px-10 mt-10">
                <Card
                    className="hover-click-animation"
                    onClick={() => navigate("/lumisenseai/connect")}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>{messages.connectDevice.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{messages.connectDevice.description}</CardContent>
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
                        handleDisconnect();
                        toast.success(messages.disconnectDevice.toastTitle, {
                            description: messages.disconnectDevice.toastDescription,
                            duration: 1500,
                        });
                        setSelectedDevice(null);
                    }}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>{messages.disconnectDevice.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{messages.disconnectDevice.description}</CardContent>
                        </div>
                        <p className="mr-10">
                            <MdLinkOff size={50} />
                        </p>
                    </div>
                </Card>
                <Card
                    className="hover-click-animation md:col-span-2"
                    onClick={() => {
                        if (!selectedDevice) {
                            toast.error(messages.controlLamp.toastTitle, {
                                description: messages.controlLamp.toastDescription,
                                duration: 1000,
                            });
                            return;
                        }
                        navigate("/lumisenseai/control");
                    }}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>{messages.controlLamp.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{messages.controlLamp.description}</CardContent>
                        </div>
                        <p className="mr-10">
                            <MdLightbulb
                                size={50}
                                className={`transition-colors duration-1000 ease-in-out ${COLOR_CLASS[colorIndex]}`}
                            />
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default LumiSenseAI;
