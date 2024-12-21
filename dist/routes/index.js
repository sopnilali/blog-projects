"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const blog_router_1 = require("../modules/blog/blog.router");
const auth_router_1 = require("../modules/auth/auth.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users/",
        routes: user_router_1.userRoutes
    },
    {
        path: "/blogs",
        routes: blog_router_1.blogRoutes
    },
    {
        path: "/auth",
        routes: auth_router_1.authRoutes
    }
];
moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});
exports.default = router;
