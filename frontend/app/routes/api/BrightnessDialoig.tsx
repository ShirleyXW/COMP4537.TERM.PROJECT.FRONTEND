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

interface BrightnessDialogProps {
    min: number;
    max: number;
}

const BrightnessDialog: React.FC<BrightnessDialogProps> = ({ min, max }) => {
    const [brightness, setBrightness] = useState((min + max) / 2);
    return (
        <div className="w-full space-y-4 px-4 py-2">
            <AlertDialogHeader className="w-full">
                <AlertDialogTitle>Pick Brightness 🎨</AlertDialogTitle>
                <AlertDialogDescription className="w-full">
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">Select Your Lamp Brigtness</h2>
                        <div className="w-full gap-5 mt-7 rounded-2xl shadow-md py-3 px-5">
                            <p className="text-center">
                                Brightness Range: {min} ~ {max}
                            </p>
                            <Slider
                                className="mt-7"
                                defaultValue={[(min + max) / 2]}
                                min={min}
                                max={max}
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
                    <Button onClick={() => {}}>Select</Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </div>
            </AlertDialogFooter>
        </div>
    );
};

export default BrightnessDialog;
