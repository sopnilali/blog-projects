import { Router } from "express";
import { userRoutes } from "../user/user.router";
import { blogRoutes } from "../blog/blog.router";
const router = Router();

const moduleRoutes = [
    {
        path: "/users/",
        routes: userRoutes
    },
    {
        path: "/blogs",
        routes: blogRoutes
    }
]

moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});

export default router;