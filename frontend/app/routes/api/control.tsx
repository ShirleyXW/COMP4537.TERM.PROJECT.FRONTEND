import { useEffect, useState } from "react";
import { Separator } from "~/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiLightbulbLine } from "react-icons/ri";

import { MdBrightness6, MdColorLens, MdAutoAwesome } from "react-icons/md";

import "./animation.css";
import AISuggestionDialog from "./AISuggestionDialog";
import ColorPickerDialog from "./ColorPickerDialog";
import BrightnessDialog from "./BrightnessDialog";
import { DashboardHeader } from "components/DashboardHeader";
import { useAuth } from "~/hooks/useAuth";
import LoadingSpinner from "components/LoadingSpinner";
import { API_BASE_URL } from "~/lib/api";

const control = () => {
    const turnOnAndOff = async (isOn: boolean) => {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/lumisenseai/turn-on-off`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goveeKey: goveeKey.trim(),
                device: device,
                isOn: isOn,
            }),
        });
        if (!response.ok) {
            console.error("Failed to fetch device: ", response.status);
        }
        const result = await response.json();
        console.log(result);
        setIsLoading(false);
    };
    const [isLoading, setIsLoading] = useState(false);
    const { loading } = useAuth();
    const [goveeKey, setGoveeKey] = useState<any>("");
    const [APIKey, setAPIKey] = useState<any>("");
    const [device, setDevice] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedDevice = localStorage.getItem("selectedDevice");
        const storedGoveeKey = localStorage.getItem("goveeKey");
        const storedAPIKey = localStorage.getItem("selectedKey");
        if (storedDevice) {
            setDevice(JSON.parse(storedDevice));
        } else {
            toast.error("Device Not Selected", {
                description: "Device is not selected. You are redirected to device selection page.",
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
        if (storedGoveeKey) {
            setGoveeKey(storedGoveeKey);
        } else {
            toast.error("Device Not Selected", {
                description: "Device is not selected. You are redirected to device selection page.",
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
        if (storedAPIKey) {
            const key = JSON.parse(storedAPIKey).key;
            setAPIKey(key);
        } else {
            toast.error("Device Not Selected", {
                description: "Device is not selected. You are redirected to device selection page.",
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen pb-10">
            <DashboardHeader title="Lumi Sense AI" />
            <Toaster />

            <div className="w-full flex-flex-col px-10">
                {device && (
                    <div className="w-full md:px-10 flex flex-col justify-center items-center mt-10 gap-5">
                        <h2 className="text-xl font-semibold">You're currently connected to:</h2>
                        <div className="w-full">
                            <Card>
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
                                                    ? "Yes, ready to control!"
                                                    : "Not controllable at the moment."}
                                            </p>
                                        </div>
                                        <div className="flex max-w-lg gap-2">
                                            <p>Possible Action: </p>
                                            {device.supportCmds.map((cmd: any, idx: number) => {
                                                return <p key={`${cmd}_${idx}`}>{cmd}</p>;
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Separator className="mt-10" />
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 w-full">
                            <Card
                                className="hover-click-animation w-full"
                                onClick={() => {
                                    turnOnAndOff(true);
                                }}
                            >
                                <div className="flex justify-between items-center gap-5 w-full">
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Turn On</CardTitle>
                                        </CardHeader>
                                        <CardContent>Turn on the power of your lamp.</CardContent>
                                    </div>
                                    <p className="mr-10">
                                        <HiOutlineLightBulb size={50} />
                                    </p>
                                </div>
                            </Card>
                            <Card
                                className="hover-click-animation w-full"
                                onClick={() => {
                                    turnOnAndOff(false);
                                }}
                            >
                                <div className="flex justify-between items-center gap-5 w-full">
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Turn Off</CardTitle>
                                        </CardHeader>
                                        <CardContent>Turn Off the power of your lamp.</CardContent>
                                    </div>
                                    <p className="mr-10">
                                        <HiOutlineLightBulb size={50} />
                                    </p>
                                </div>
                            </Card>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Card className="hover-click-animation w-full">
                                        <div className="flex justify-between items-center gap-5 w-full">
                                            <div>
                                                <CardHeader>
                                                    <CardTitle>Adjust Brightness</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    Slide to brighten or dim your lamp as needed.
                                                </CardContent>
                                            </div>
                                            <p className="mr-10">
                                                <MdBrightness6 size={50} />
                                            </p>
                                        </div>
                                    </Card>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-full overflow-y-auto max-h-[80vh]">
                                    <BrightnessDialog
                                        min={device.properties.colorTem.range.min}
                                        max={device.properties.colorTem.range.max}
                                        goveeKey={goveeKey}
                                        device={device}
                                    />
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Card className="hover-click-animation w-full">
                                        <div className="flex justify-between items-center gap-5 w-full">
                                            <div>
                                                <CardHeader>
                                                    <CardTitle>Pick a Color</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    Set your lamp’s color to match your mood or
                                                    style.
                                                </CardContent>
                                            </div>
                                            <p className="mr-10">
                                                <MdColorLens size={50} />
                                            </p>
                                        </div>
                                    </Card>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-full overflow-y-auto max-h-[80vh]">
                                    <ColorPickerDialog goveeKey={goveeKey} device={device} />
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Card className="hover-click-animation w-full">
                                        <div className="flex justify-between items-center gap-5 w-full">
                                            <div>
                                                <CardHeader>
                                                    <CardTitle>AI Color Suggestion</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    Let AI suggest the best light color for your
                                                    current vibe.
                                                </CardContent>
                                            </div>
                                            <p className="mr-10">
                                                <MdAutoAwesome size={50} />
                                            </p>
                                        </div>
                                    </Card>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-full overflow-y-auto max-h-[80vh]">
                                    <AISuggestionDialog goveeKey={goveeKey} device={device} />
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                )}
                <div className="mt-10 w-full flex justify-center">
                    <Button
                        className="h-15 px-10"
                        onClick={() => {
                            navigate("/lumisenseai");
                        }}
                    >
                        Back to Device Selection
                    </Button>
                </div>
            </div>
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-custom-gray/30  flex items-center justify-center">
                    <div className="bg-white rounded-full p-5 shadow-lg">
                        <LoadingSpinner />
                    </div>
                </div>
            )}
        </div>
    );
};

export default control;
