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
const AISuggestionDialog = () => {
    const [selectedEmotion, setSelectedEmotion] = useState("");
    const handleEmotionCardClick = (title: string) => {
        setSelectedEmotion(title);
    };
    const [additionalRequest, setAdditionalRequest] = useState("");
    const [useLocation, setUseLocation] = useState<boolean>(false);
    const createRequestBody = () => {
        const body = {};
        if (useLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude);
            }),
                (error: any) => {
                    console.log(error);
                };
        }
        console.log(selectedEmotion);
        console.log(useLocation);
    };
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
                        <div className="mt-5 flex gap-3 justify-between items-center">
                            <Checkbox
                                id="weather"
                                checked={useLocation}
                                onCheckedChange={(checked: any) => {
                                    setUseLocation(checked === true);
                                    console.log(useLocation);
                                }}
                            />
                            <label htmlFor="weather">
                                Use my location to add a little magic to the mood? ✨🌎
                            </label>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 ">
                <div className="w-full flex justify-between">
                    <Button onClick={createRequestBody}>ASK AI</Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </div>
            </AlertDialogFooter>
        </div>
    );
};

export default AISuggestionDialog;
