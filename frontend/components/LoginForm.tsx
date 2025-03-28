import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { login } from "@/lib/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { messages } from "~/lang/login/en"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [result, formAction, pending] = useActionState(login, null);
  
  // Handle successful login
  useEffect(() => {
    if (!result) return;

    if (result.success) {
      if (result.is_admin) {
        navigate("/adminDashboard")
      } else {
        navigate("/userDashboard");
      }
    }
  }, [result, navigate]);

  // Determine if we have an error message
  const errorMessage = !result?.success ? result?.message : null;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{messages.loginTitle}</CardTitle>
          <CardDescription>
            {messages.loginDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{messages.emailLabel}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{messages.passwordLabel}</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? `${messages.loggingInButton}` : `${messages.loginButton}`}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {messages.noAccount}{" "}
              <a href="register" className="underline underline-offset-4">
                {messages.signUp}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
