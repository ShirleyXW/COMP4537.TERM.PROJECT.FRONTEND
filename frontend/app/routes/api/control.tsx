import { useEffect, useState } from "react";
import { messages } from "@/lang/api/control/en";
import { toastMessages } from "@/lang/api/toast/en";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { HiOutlineLightBulb } from "react-icons/hi";

import { MdBrightness6, MdColorLens, MdAutoAwesome } from "react-icons/md";

import "./animation.css";
import AISuggestionDialog from "../../../components/api/dialog/AISuggestionDialog";
import ColorPickerDialog from "../../../components/api/dialog/ColorPickerDialog";
import BrightnessDialog from "../../../components/api/dialog/BrightnessDialog";
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
            console.error(response.status);
            toast.error(toastMessages.error.title, {
                description: toastMessages.error.description,
                duration: 1500,
            });
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
            toast.error(messages.toastDeviceMissing.title, {
                description: messages.toastDeviceMissing.desc,
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
        if (storedGoveeKey) {
            setGoveeKey(storedGoveeKey);
        } else {
            toast.error(messages.toastDeviceMissing.title, {
                description: messages.toastDeviceMissing.desc,
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
        if (storedAPIKey) {
            const key = JSON.parse(storedAPIKey).key;
            setAPIKey(key);
        } else {
            toast.error(messages.toastDeviceMissing.title, {
                description: messages.toastDeviceMissing.desc,
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="w-full min-h-screen pb-10">
            <DashboardHeader title={messages.headerTitle} />
            <Toaster />

            <div className="w-full flex-flex-col px-10">
                {device && (
                    <div className="w-full md:px-10 flex flex-col justify-center items-center mt-10 gap-5">
                        <h2 className="text-xl font-semibold">{messages.connectedTo}</h2>
                        <div className="w-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{`${device.deviceName} (${device.model})`}</CardTitle>
                                    <CardDescription>{`${device.device}`}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="flex max-w-lg gap-2">
                                            <p>{messages.supportedLabel}</p>
                                            <p>
                                                {device.controllable
                                                    ? messages.supportedYes
                                                    : messages.supportedNo}
                                            </p>
                                        </div>
                                        <div className="flex max-w-lg gap-2">
                                            <p>{messages.possibleAction}</p>
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
                                            <CardTitle>{messages.turnOnTitle}</CardTitle>
                                        </CardHeader>
                                        <CardContent>{messages.turnOnDesc}</CardContent>
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
                                            <CardTitle>{messages.turnOffTitle}</CardTitle>
                                        </CardHeader>
                                        <CardContent>{messages.turnOffDesc}</CardContent>
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
                                                    <CardTitle>
                                                        {messages.brightnessTitle}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>{messages.brightnessDesc}</CardContent>
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
                                                    <CardTitle>{messages.colorPickTitle}</CardTitle>
                                                </CardHeader>
                                                <CardContent>{messages.colorPickDesc}</CardContent>
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
                                                    <CardTitle>{messages.aiTitle}</CardTitle>
                                                </CardHeader>
                                                <CardContent>{messages.aiDesc}</CardContent>
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
                        {messages.backBtn}
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
