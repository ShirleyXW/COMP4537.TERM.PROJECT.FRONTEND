import APIKeyCheck from "components/APIKeyCheckForm";
import { FaRegLightbulb } from "react-icons/fa";
import { LuLampDesk } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import "./animation.css";

const LumiSenseAI = () => {
    const navigate = useNavigate();
    const [isKeyChecked, setIsKeyChecked] = useState(true);

    if (!isKeyChecked) return <APIKeyCheck />;
    return (
        <div className="w-full min-h-screen flex flex-col max-h-screen">
            <h1 className="text-3xl font-bold text-center">Lumi Sense AI</h1>
            <div className="w-full grid md:grid-cols-2 gap-10 gap-y-5 md:px-10 mt-35">
                <Card
                    className="hover-click-animation"
                    onClick={() => navigate("/lumisenseai/connect")}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>Connect Device</CardTitle>
                            </CardHeader>
                            <CardContent>Connect device you want to use</CardContent>
                        </div>
                        <p className="mr-10">
                            <LuLampDesk size={50} />
                        </p>
                    </div>
                </Card>
                <Card
                    className="hover-click-animation"
                    onClick={() => navigate("/lumisenseai/control")}
                >
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <CardHeader>
                                <CardTitle>Control Device</CardTitle>
                            </CardHeader>
                            <CardContent>Control your device</CardContent>
                        </div>
                        <p className="mr-10">
                            <FaRegLightbulb size={50} />
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LumiSenseAI;
