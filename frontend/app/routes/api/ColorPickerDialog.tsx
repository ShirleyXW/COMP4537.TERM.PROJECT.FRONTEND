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

import { HexColorPicker } from "react-colorful";

const ColorPickerDialog = () => {
    const [color, setColor] = useState("#ff0000");

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
                    <Button onClick={() => {}}>Select</Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </div>
            </AlertDialogFooter>
        </div>
    );
};
export default ColorPickerDialog;
