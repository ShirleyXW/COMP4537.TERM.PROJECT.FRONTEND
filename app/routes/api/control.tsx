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
import BrightnessDialog from "./BrightnessDialoig";

const control = () => {
    const navigate = useNavigate();

    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    useEffect(() => {
        const storedDevice = localStorage.getItem("selectedDevice");
        if (storedDevice) {
            setSelectedDevice(JSON.parse(storedDevice));
        } else {
            toast.error("Device Not Selected", {
                description: "Device is not selected. You are redirected to device selection page.",
                duration: 1500,
            });
            navigate("/lumisenseai");
        }
    }, []);

    return (
        <div className="w-full min-h-screen">
            <Toaster />

            <div className="w-full flex-flex-col">
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
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 w-full">
                            <Card className="hover-click-animation w-full">
                                <div className="flex justify-between items-center gap-5 w-full">
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Turn On / Off</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            Toggle the power of your lamp with a single tap.
                                        </CardContent>
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
                                        min={selectedDevice.properties.colorTem.range.min}
                                        max={selectedDevice.properties.colorTem.range.max}
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
                                    <ColorPickerDialog />
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
                                    <AISuggestionDialog />
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
                        {" "}
                        Back to Device Selection
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default control;
