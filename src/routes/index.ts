import { Router } from "express";
import { userRoutes } from "../modules/user/user.router";
import { blogRoutes } from "../modules/blog/blog.router";
import { authRoutes } from "../modules/auth/auth.router";

const router = Router();

const moduleRoutes = [
    {
        path: "/users/",
        routes: userRoutes
    },
    {
        path: "/blogs",
        routes: blogRoutes
    },
    {
        path: "/auth",
        routes: authRoutes
    }
]

moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});

export default router;