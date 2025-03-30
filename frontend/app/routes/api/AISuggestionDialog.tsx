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
import { Label } from "~/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { API_BASE_URL } from "~/lib/api";
import ReactDOM from "react-dom";
import AIResultDialog from "./AIResultDialog";
const EMOTION = [
    {
        title: "HAPPY",
        description: "The world feels extra sparkly today, and so does my heart!",
        emoji: "😁",
    },
    {
        title: "CALM",
        description: "It’s a quiet kind of peaceful today — like a gentle breeze hugging my soul.",
        emoji: "🌿",
    },
    {
        title: "IN LOVE",
        description: "My heart’s doing a little happy dance whenever I think of someone special.",
        emoji: "💗",
    },
    {
        title: "SLEEPY",
        description: "All I want is a cozy blanket, warm tea, and a dreamy nap.",
        emoji: "😴",
    },
    {
        title: "SAD",
        description: "It feels a little cloudy inside, but I know the sun will peek out soon.",
        emoji: "🌧️",
    },
    {
        title: "LONELY",
        description: "Just me and my thoughts today... I could use a soft hug.",
        emoji: "😢",
    },
    {
        title: "ANGRY",
        description:
            "My feelings are stormy right now — loud and flashing. I just need some space to cool down.",
        emoji: "🌩️",
    },
    {
        title: "NEUTRAL",
        description: "Nothing too wild, nothing too quiet — just floating through the day.",
        emoji: "🎈",
    },
];
import LoadingSpinner from "components/LoadingSpinner";

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
                <AlertDialogTitle>AI Suggestion</AlertDialogTitle>
                <AlertDialogDescription>
                    <div className="flex flex-col w-full justify-center items-center">
                        <h2 className="font-bold text-2xl">Select Your Mood Today</h2>
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
                                Additional Request 💡
                            </Label>
                            <Textarea
                                id="add-request"
                                placeholder="Tell me the colors you love or dislike, how you want to feel, or just the vibe you're dreaming of today ✨"
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
                        ASK AI
                    </Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
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
