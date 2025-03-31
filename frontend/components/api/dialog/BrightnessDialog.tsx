import { useState } from "react";

import { API_BASE_URL } from "~/lib/api";
import { messages } from "@/lang/api/dialog/BrightnessDialog/en";
import { toastMessages } from "~/lang/api/toast/en";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Slider } from "@/components/ui/slider";

import LoadingSpinner from "components/LoadingSpinner";

interface BrightnessDialogProps {
    min: number;
    max: number;
    goveeKey: string;
    device: any;
}

const BrightnessDialog: React.FC<BrightnessDialogProps> = ({ goveeKey, device }) => {
    const [brightness, setBrightness] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    const setLampBrightness = async (brightness: number) => {
        setIsLoading(true);
        const keyData = localStorage.getItem("selectedKey");
        let apiKey;
        if (keyData) {
            const parsedKeyData = JSON.parse(keyData);
            apiKey = parsedKeyData.key;
        } else {
            toast.error(toastMessages.error.title, {
                description: toastMessages.error.description,
                duration: 1500,
            });
        }
        const response = await fetch(`${API_BASE_URL}/lumisenseai/set-brightness`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-service-api-key": apiKey,
            },
            body: JSON.stringify({
                goveeKey: goveeKey.trim(),
                device: device,
                brightness: brightness,
            }),
        });
        if (!response.ok) {
            toast.error(toastMessages.error.title, {
                description: toastMessages.error.description,
                duration: 1500,
            });
        }
        const result = await response.json();
        setIsLoading(false);
    };
    return (
        <div className="w-full space-y-4 px-4 py-2">
            <AlertDialogHeader className="w-full">
                <AlertDialogTitle>{messages.title}</AlertDialogTitle>
                <AlertDialogDescription className="w-full">
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">{messages.heading}</h2>
                        <div className="w-full gap-5 mt-7 rounded-2xl shadow-md py-3 px-5">
                            <p className="text-center">
                                {messages.rangeLabel} {1} ~ {100}
                            </p>
                            <Slider
                                className="mt-7"
                                defaultValue={[50]}
                                min={1}
                                max={100}
                                step={1}
                                value={[brightness]}
                                onValueChange={(val) => setBrightness(val[0])}
                            />
                            <p className="mt-7 text-center">
                                {messages.selectedLabel} {brightness}
                            </p>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 ">
                <div className="w-full flex justify-between">
                    <Button
                        onClick={() => {
                            setLampBrightness(brightness);
                        }}
                    >
                        {messages.selectBtn}
                    </Button>
                    <AlertDialogCancel>{messages.cancelBtn}</AlertDialogCancel>
                </div>
            </AlertDialogFooter>
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

export default BrightnessDialog;
