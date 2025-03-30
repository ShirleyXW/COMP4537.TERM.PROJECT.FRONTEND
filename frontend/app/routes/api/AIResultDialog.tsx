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
// @ts-ignore
import namer from "color-namer";

interface AIResultDialogProps {
    data: any;
    setAIResult: (data: any) => void;
}
const AIResultDialog: React.FC<AIResultDialogProps> = ({ data, setAIResult }) => {
    const color = namer(data.color).ntc[0].name;
    console.log(data.color);
    console.log(color);
    return (
        <div className="w-full space-y-4 px-4 py-2">
            <AlertDialogHeader className="w-full">
                <AlertDialogDescription>
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">
                            Here’s a little light magic for you ✨
                        </h2>

                        <div className="w-full mt-7 flex flex-col items-center">
                            <h3 className="font-bold text-xl mb-5">Your Mood Color</h3>
                            <div className="w-full flex justify-center flex-col items-center">
                                <div
                                    className={`w-[100px] h-[100px] border-2 rounded-lg flex justify-center border-custom-gray items-center shadow-lg`}
                                    style={{ backgroundColor: data.color }}
                                >
                                    {data.color}
                                </div>
                                <p>{color}</p>
                            </div>
                        </div>
                        <div className="mt-5 w-full">
                            <p className="font-bold">
                                Why this color?<span className="ml-2">🧚</span>
                            </p>
                            <p>{data.reason}</p>
                        </div>
                        <div className="mt-5 w-full">
                            <p className="font-bold">
                                A soft whisper from the AI...<span className="ml-2">💭</span>
                            </p>
                            <p>{data.advice}</p>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 ">
                <div className="w-full flex justify-between">
                    <AlertDialogCancel onClick={() => setAIResult(null)}>Cancel</AlertDialogCancel>
                </div>
            </AlertDialogFooter>
        </div>
    );
};
export default AIResultDialog;
