import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("register", "routes/register.tsx"),
    route("info", "routes/info.tsx"),
    route("userDashboard", "routes/userDashboard.tsx"),
<<<<<<< HEAD:app/routes.ts
    route("login", "routes/login.tsx"),
<<<<<<< HEAD
    route("lumisenseai", "routes/api/lumisenseai.tsx"),
    route("lumisenseai/connect", "routes/api/connect.tsx"),
    route("lumisenseai/control", "routes/api/control.tsx"),
=======
    route("api-key-check", "routes/APIKeyCheck.tsx"),
=======
    route("adminDashboard", "routes/adminDashboard.tsx"),
    route("login", "routes/login.tsx")
>>>>>>> dev:frontend/app/routes.ts
>>>>>>> 43df91379b8cd048db5b1eab53dfd93f90d3a8a1
] satisfies RouteConfig;
