import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {useForm} from "react-hook-form"

type APIKeyFormInput = {
    key: string
}

const APIKeyCheck = () => {
    const {register, getValues} = useForm<APIKeyFormInput>()
    return (
        <div className="w-full flex justify-center flex-col items-center h-screen ">
            <Card className="sm:w-full w-3/4 max-w-[800px]">
                <CardHeader>
                    <CardTitle>Register API Key</CardTitle>
                    <CardDescription>
                        Enter your API key below to access the Lumi Sense AI services.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                        <form className="flex w-full items-center space-x-2">
                            <Input type="text" placeholder="API Key" {...register("key")}/>
                            <Button type="submit" onClick={(e) => {
                                e.preventDefault()
                                console.log(getValues("key"))
                            }}>Submit</Button>
                        </form>
                </CardContent>
                <Separator />
                <CardFooter>
                    <div className="flex flex-col items-end w-full gap-5">
                        <div className="flex flex-col items-end w-full">
                            <p className="text-sm text-muted-foreground">
                                Don’t have an API key yet?
                            </p>
                            <Button variant="link">
                                <p>Create one here</p>
                            </Button>
                        </div>
                        <div className="flex flex-col items-end w-full">
                            <p className="text-sm text-muted-foreground">Forgot your API key?</p>
                            <Button variant="link" className="text-[#F472B6]">
                                <p>Recover it here</p>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );

};

export default APIKeyCheck;
