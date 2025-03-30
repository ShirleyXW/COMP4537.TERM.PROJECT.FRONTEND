import APIKeyCheck from "~/routes/lumisenseAIAPIKeyCheck";
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
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "~/lib/api";
import { Toaster, toast } from "sonner";
import { useAuth } from "~/hooks/useAuth";
import LoadingSpinner from "components/LoadingSpinner";
import "./animation.css";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "components/DashboardHeader";
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

    const [isClosing, setIsClosing] = useState(false);
    const handleDisconnect = () => {
        setIsClosing(true);
        setTimeout(() => {
            localStorage.removeItem("selectedDevice");
            setSelectedDevice(null);
            setIsClosing(false);
        }, 500);
    };
    if (loading) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen flex flex-col max-h-screen">
            <DashboardHeader title="Lumi Sense AI" />
            <Toaster />
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
                        handleDisconnect();
                        toast.success("Disconnected!", {
                            description: "Your lamp successfully disconnected.",
                            duration: 1500,
                        });
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
                    onClick={() => {
                        if (!selectedDevice) {
                            toast.error("Lamp Not Selected!", {
                                description: "Select your lamp to control it.",
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
            </motion.div>
        </div>
    );
};

export default LumiSenseAI;
