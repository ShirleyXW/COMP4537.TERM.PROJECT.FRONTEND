import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

interface EmotionCardProps {
    title: string;
    description: string;
    emoji: string;
    selectedEmotion: string;
    setSelectedEmotion: (title: string) => void;
}

const EmotionCard: React.FC<EmotionCardProps> = ({
    title,
    description,
    emoji,
    selectedEmotion,
    setSelectedEmotion,
}) => {
    return (
        <div
            className="flex justify-between"
            onClick={() => {
                setSelectedEmotion(title);
            }}
        >
            <Card
                className={`w-full flex justify-between ${selectedEmotion == title && "border-4"}`}
            >
                <div className="flex justify-between items-center gap-5 w-full">
                    <div>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>{description}</CardContent>
                    </div>
                    <p className="font-bold text-5xl mr-5">{emoji}</p>
                </div>
            </Card>
        </div>
    );
};

export default EmotionCard;
