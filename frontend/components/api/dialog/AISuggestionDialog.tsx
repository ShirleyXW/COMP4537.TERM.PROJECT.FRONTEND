import { useState } from "react";
import ReactDOM from "react-dom";

import { API_BASE_URL } from "@/lib/api";
import { EMOTION } from "@/lang/api/dialog/AISuggestionDialog/emotion/en";
import { messages } from "@/lang/api/dialog/AISuggestionDialog/en";
import { Button } from "@/components/ui/button";
import {
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import EmotionCard from "@/../components/api/EmotionCard";
import AIResultDialog from "./AIResultDialog";

interface AISuggestionDialogProps {
    goveeKey: string;
    device: any;
}

const AISuggestionDialog: React.FC<AISuggestionDialogProps> = ({ goveeKey, device }) => {
    const [selectedEmotion, setSelectedEmotion] = useState("");
    const [AIResult, setAIResult] = useState<any>(null);
    const handleEmotionCardClick = (title: string) => {
        setSelectedEmotion(title);
    };
    const [isLoading, setIsLoading] = useState(false);
    const setColorByAI = async (emotion: string) => {
        setIsLoading(true);
        console.log("REQUEST");
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const time = `${hours}:${minutes}`;
        const addReq = additionalRequest.length == 0 ? null : additionalRequest;
        const response = await fetch(`${API_BASE_URL}/lumisenseai/set-color-by-ai`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goveeKey: goveeKey.trim(),
                device: device,
                emotion: emotion,
                time: time,
                addReq: addReq,
            }),
        });
        if (!response.ok) {
            console.error("Failed to fetch device: ", response.status);
        }
        const result = await response.json();
        setAIResult(result.data);
        console.log(result);
        setIsLoading(false);
    };
    const [additionalRequest, setAdditionalRequest] = useState("");
    if (AIResult) return <AIResultDialog data={AIResult} setAIResult={setAIResult} />;
    return (
        <div className="w-full space-y-4 px-4 py-2">
            <AlertDialogHeader className="w-full">
                <AlertDialogTitle>{messages.dialogTitle}</AlertDialogTitle>
                <AlertDialogDescription>
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">{messages.headerTitle}</h2>
                        <div className="grid w-full gap-5 mt-7">
                            {EMOTION.map((item: any, idx: number) => {
                                return (
                                    <EmotionCard
                                        key={`${item.title}_${idx}`}
                                        title={item.title}
                                        description={item.description}
                                        emoji={item.emoji}
                                        selectedEmotion={selectedEmotion}
                                        setSelectedEmotion={handleEmotionCardClick}
                                    />
                                );
                            })}
                        </div>
                        <div className="w-full mt-7">
                            <Label className="mb-2" htmlFor="add-request">
                                {messages.additionalRequestLabel}
                            </Label>
                            <Textarea
                                id="add-request"
                                placeholder={messages.additionalRequestPlaceholder}
                                value={additionalRequest}
                                onChange={(e) => setAdditionalRequest(e.target.value)}
                            />
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 ">
                <div className="w-full flex justify-between">
                    <Button
                        onClick={() => {
                            setColorByAI(selectedEmotion);
                        }}
                    >
                        {messages.askButton}
                    </Button>
                    <AlertDialogCancel>{messages.cancelButton}</AlertDialogCancel>
                </div>
            </AlertDialogFooter>
            {isLoading &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center">
                        <div className="bg-white rounded-full p-5 shadow-lg">
                            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default AISuggestionDialog;
