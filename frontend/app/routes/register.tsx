"use client"
import type {Route} from "./+types/home";
import {AspectRatio} from "~/components/ui/aspect-ratio"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {register} from "~/lib/register";
import {useState} from "react";
import { formUi,  zodValidation, metaMessage, errorMessage} from "~/lang/register/en";


const formSchema = z.object({
    username: z.string().min(2, {
        message: zodValidation.userNameMinLength,
    }),
    email: z.string().email({message: zodValidation.emailFormat}),
    password: z.string().min(3, {message: zodValidation.passwordMinLength}),
    confirmedPassword: z.string().min(3, {message: zodValidation.confirmedPasswordMinLength}),
}).refine(
    data => data.confirmedPassword === data.password,
    {
        message: zodValidation.passwordNotMatch,
        path: ["confirmedPassword"],
    }
)

export const meta = ({}: Route.MetaArgs) => {
    return [
        {title: metaMessage.title},
        {name: metaMessage.name, content: metaMessage.description},
    ];
};
const Register = () => {
    const [isSuccess, setSuccess] = useState(false);
    const [result, setResult] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmedPassword: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await register({
                "username": data.username,
                "email": data.email,
                "password": data.password
            });
            if (response.success) {
                setSuccess(true);
                form.reset();
            } else {
                setSuccess(false);

            }
            setResult(response.message);
        }
        catch (error){
            console.error(error);
            setSuccess(false);
            setResult(error instanceof Error ? error.message : errorMessage.registerError);
        }
    }
    return (
        <div className="w-1/2 mx-auto border border-solid rounded-lg p-6">
            <h2 className="text-2xl mb-4 font-bold">{formUi.title}</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{formUi.userName}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="" {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {formUi.userNameDiscription}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{formUi.email}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="" {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {formUi.emailDiscription}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{formUi.password}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="" {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {formUi.passwordDiscription}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmedPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{formUi.confirmedPassword}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="" {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {formUi.confirmedPasswordDiscription}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="rounded ">{formUi.submitButton}</Button>
                        <div className="flex flex-col items-center">
                            <a href="login" className="underline hover:text-blue-900">{formUi.loginTip}</a>
                        </div>
                    </form>
                </Form>
            {isSuccess && (
                <div>
                    <p>{result}</p>
                </div>
            )}
        </div>
    )
};

export default Register;