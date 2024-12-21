"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.blogController.createBlogContent);
router.get('/', blog_controller_1.blogController.getBlogContent);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.blogController.updateBlogContent);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), blog_controller_1.blogController.deleteBlogContent);
exports.blogRoutes = router;
