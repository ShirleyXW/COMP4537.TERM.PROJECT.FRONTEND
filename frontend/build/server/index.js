import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement, useState, useActionState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { FormProvider, Controller, useFormContext, useFormState, useForm } from "react-hook-form";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary2, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
const Layout = ({
  children
}) => {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsx("body", {
      children: /* @__PURE__ */ jsxs("main", {
        className: "max-w-[1024px] mx-auto px-5 py-10",
        children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
      })
    })]
  });
};
const App = () => {
  return /* @__PURE__ */ jsx(Outlet, {});
};
const root = withComponentProps(App);
const ErrorBoundary = withErrorBoundaryProps(({
  error
}) => {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = ({}) => {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
};
const Home = () => {
  return /* @__PURE__ */ jsx("div", {
    children: "HOME"
  });
};
const home = withComponentProps(Home);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String((error == null ? void 0 : error.message) ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props,
      children: body
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const register$1 = async (data) => {
  try {
    const res = await fetch(
      "http://localhost:8000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = await res.json();
    if (res.ok) {
      return { success: true, message: result.message || "Registration successful" };
    } else {
      return { success: false, error: result.message || "Unknown error" };
    }
  } catch (error) {
    return { success: false, error: error || "Network or unknown error" };
  }
};
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Email must be align with the form of xx@xx.xx"
  }),
  password: z.string().min(6, {
    message: "Password must be at length of 6."
  }),
  confirmedPassword: z.string().min(6, {
    message: "Confirmed password must be at length of 6."
  })
}).refine((data) => data.confirmedPassword === data.password, {
  message: "Passwords do not match.",
  path: ["confirmedPassword"]
});
const meta$2 = ({}) => {
  return [{
    title: "Register"
  }, {
    name: "Register",
    content: "Welcome to register with us!"
  }];
};
const Register = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [result, setResult] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      const response = await register$1({
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
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setResult(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "w-1/2 mx-auto border border-solid rounded-lg p-6",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-2xl mb-4 font-bold",
      children: "Register"
    }), /* @__PURE__ */ jsx(Form, {
      ...form,
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: form.handleSubmit(onSubmit),
        className: "space-y-8 flex flex-col",
        children: [/* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "username",
          render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Username"
            }), /* @__PURE__ */ jsx(FormControl, {
              children: /* @__PURE__ */ jsx(Input, {
                placeholder: "",
                ...field
              })
            }), /* @__PURE__ */ jsx(FormDescription, {
              children: "This is your public display name."
            }), /* @__PURE__ */ jsx(FormMessage, {})]
          })
        }), /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "email",
          render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Email"
            }), /* @__PURE__ */ jsx(FormControl, {
              children: /* @__PURE__ */ jsx(Input, {
                placeholder: "",
                ...field
              })
            }), /* @__PURE__ */ jsx(FormDescription, {
              children: "This is your email for log in."
            }), /* @__PURE__ */ jsx(FormMessage, {})]
          })
        }), /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "password",
          render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Password"
            }), /* @__PURE__ */ jsx(FormControl, {
              children: /* @__PURE__ */ jsx(Input, {
                placeholder: "",
                ...field,
                type: "password"
              })
            }), /* @__PURE__ */ jsx(FormDescription, {
              children: "This is your password for log in."
            }), /* @__PURE__ */ jsx(FormMessage, {})]
          })
        }), /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "confirmedPassword",
          render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              children: "Confirm your password"
            }), /* @__PURE__ */ jsx(FormControl, {
              children: /* @__PURE__ */ jsx(Input, {
                placeholder: "",
                ...field,
                type: "password"
              })
            }), /* @__PURE__ */ jsx(FormDescription, {
              children: "Please confirm your password."
            }), /* @__PURE__ */ jsx(FormMessage, {})]
          })
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "rounded ",
          children: "Submit"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex flex-col items-center",
          children: /* @__PURE__ */ jsx("a", {
            href: "login",
            className: "underline hover:text-blue-900",
            children: "Have an account? Log in"
          })
        })]
      })
    }), isSuccess && /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("p", {
        children: result
      })
    })]
  });
};
const register = withComponentProps(Register);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = ({}) => {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
};
const Info = () => {
  return /* @__PURE__ */ jsx("div", {
    children: "Hello Info"
  });
};
const info = withComponentProps(Info);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: info,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  return /* @__PURE__ */ jsxs("section", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Dashboard"
    }), /* @__PURE__ */ jsx("p", {
      children: "Remaining API calls"
    })]
  });
};
const dashboard = withComponentProps(Dashboard);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const API_BASE_URL = "http://localhost:8000";
const login$1 = async (prevState, formData) => {
  var _a, _b;
  const username = formData.get("email");
  const password = formData.get("password");
  if (!username || !password) {
    return "Email and password are required";
  }
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/token`, params, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    if (res.data.status === 200) {
      return { success: true };
    }
    return null;
  } catch (error) {
    console.error(error);
    if ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.detail) {
      return error.response.data.detail;
    }
    return "Login failed. Please try again.";
  }
};
function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const [result, formAction, pending] = useActionState(login$1, null);
  useEffect(() => {
    if (result && typeof result === "object" && "success" in result) {
      navigate("/dashboard");
    }
  }, [result, navigate]);
  const errorMessage = typeof result === "string" ? result : null;
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-6", className), ...props, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "Login" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your email below to login to your account" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { action: formAction, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              name: "email",
              type: "email",
              placeholder: "m@example.com",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                children: "Forgot your password?"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Input, { id: "password", name: "password", type: "password", required: true })
        ] }),
        errorMessage && /* @__PURE__ */ jsx("div", { className: "text-sm text-red-500", children: errorMessage }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: pending, className: "w-full", children: pending ? "Logging in..." : "Login" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx("a", { href: "register", className: "underline underline-offset-4", children: "Sign up" })
      ] })
    ] }) })
  ] }) });
}
const meta = ({}) => {
  return [{
    title: "Login - Your App"
  }, {
    name: "description",
    content: "Login to access your account"
  }];
};
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const hasToken = document.cookie.includes("access_token");
    if (hasToken) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return /* @__PURE__ */ jsx("div", {
    className: "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
    children: /* @__PURE__ */ jsx("div", {
      className: "w-full max-w-sm",
      children: /* @__PURE__ */ jsx(LoginForm, {})
    })
  });
};
const login = withComponentProps(Login);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DWvouwJM.js", "imports": ["/assets/chunk-K6CSEXPM-DcZlbQav.js", "/assets/index-BGJXF7Jr.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CfFoujDz.js", "imports": ["/assets/chunk-K6CSEXPM-DcZlbQav.js", "/assets/index-BGJXF7Jr.js", "/assets/with-props-GgHiePyh.js"], "css": ["/assets/root-CWG8OuwP.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-CxL759zt.js", "imports": ["/assets/with-props-GgHiePyh.js", "/assets/chunk-K6CSEXPM-DcZlbQav.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register-DakDdJ7O.js", "imports": ["/assets/with-props-GgHiePyh.js", "/assets/chunk-K6CSEXPM-DcZlbQav.js", "/assets/input-BvuuwM6S.js", "/assets/index-BGJXF7Jr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/info": { "id": "routes/info", "parentId": "root", "path": "info", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/info-DzHimCt-.js", "imports": ["/assets/with-props-GgHiePyh.js", "/assets/chunk-K6CSEXPM-DcZlbQav.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/dashboard-Be2r4hiG.js", "imports": ["/assets/with-props-GgHiePyh.js", "/assets/chunk-K6CSEXPM-DcZlbQav.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-D7JmaLgW.js", "imports": ["/assets/with-props-GgHiePyh.js", "/assets/chunk-K6CSEXPM-DcZlbQav.js", "/assets/input-BvuuwM6S.js", "/assets/index-BGJXF7Jr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-0fb7651f.js", "version": "0fb7651f" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/info": {
    id: "routes/info",
    parentId: "root",
    path: "info",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
