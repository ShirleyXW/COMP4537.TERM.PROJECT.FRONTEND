import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("register", "routes/register.tsx"),
    route("info", "routes/info.tsx"),
    route("userDashboard", "routes/userDashboard.tsx"),
<<<<<<< HEAD:app/routes.ts
    route("login", "routes/login.tsx"),
    route("api-key-check", "routes/APIKeyCheck.tsx"),
=======
    route("adminDashboard", "routes/adminDashboard.tsx"),
    route("login", "routes/login.tsx")
>>>>>>> dev:frontend/app/routes.ts
] satisfies RouteConfig;
