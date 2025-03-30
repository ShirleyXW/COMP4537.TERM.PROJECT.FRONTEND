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
import EmotionCard from "./EmotionCard";
import { use, useState } from "react";
import { API_BASE_URL } from "~/lib/api";
import LoadingSpinner from "components/LoadingSpinner";

import { HexColorPicker } from "react-colorful";
const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
};

interface ColorPickerDialogProps {
    goveeKey: string;
    device: any;
}

const ColorPickerDialog: React.FC<ColorPickerDialogProps> = ({ goveeKey, device }) => {
    const [color, setColor] = useState("#ff0000");
    const [isLoading, setIsLoading] = useState(false);
    console.log(goveeKey, device);
    const setLampColor = async (color: any) => {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/lumisenseai/set-color`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goveeKey: goveeKey.trim(),
                device: device,
                color: color,
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
                <AlertDialogTitle>Pick Color 🎨</AlertDialogTitle>
                <AlertDialogDescription className="w-full">
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">Select Color You Want to Use</h2>
                        <div className="w-full gap-5 mt-7 rounded-2xl shadow-md py-3">
                            <HexColorPicker
                                color={color}
                                onChange={setColor}
                                className="mx-auto shadow-md cursor-pointer"
                            />
                            <p className="mt-2 text-center ">
                                Current Color: <span style={{ color }}>{color}</span>
                            </p>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 ">
                <div className="w-full flex justify-between">
                    <Button
                        onClick={() => {
                            setLampColor(hexToRgb(color));
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
export default ColorPickerDialog;
