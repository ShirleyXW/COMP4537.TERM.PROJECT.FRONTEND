import { Button } from "~/components/ui/button";
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
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { API_BASE_URL } from "~/lib/api";
import LoadingSpinner from "components/LoadingSpinner";

interface BrightnessDialogProps {
    min: number;
    max: number;
    goveeKey: string;
    device: any;
}

const BrightnessDialog: React.FC<BrightnessDialogProps> = ({ min, max, goveeKey, device }) => {
    const [brightness, setBrightness] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    const setLampBrightness = async (brightness: number) => {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/lumisenseai/set-brightness`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goveeKey: goveeKey.trim(),
                device: device,
                brightness: brightness,
            }),
        });
        if (!response.ok) {
            console.error("Failed to fetch device: ", response.status);
        }
        const result = await response.json();
        console.log(result);
        setIsLoading(false);
    };
    return (
        <div className="w-full space-y-4 px-4 py-2">
            <AlertDialogHeader className="w-full">
                <AlertDialogTitle>Pick Brightness 🎨</AlertDialogTitle>
                <AlertDialogDescription className="w-full">
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">Select Your Lamp Brightness</h2>
                        <div className="w-full gap-5 mt-7 rounded-2xl shadow-md py-3 px-5">
                            <p className="text-center">
                                Brightness Range: {1} ~ {100}
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
                            <p className="mt-7 text-center">Selected Brightness: {brightness}</p>
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
                        Select
                    </Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
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
