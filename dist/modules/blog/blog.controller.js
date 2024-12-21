"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const user_model_1 = require("../user/user.model");
const createBlogContent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 201;
    const { title, content } = req.body;
    // let token = null;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //   token = req.headers.authorization.split(" ")[1];
    // }
    // console.log(token);
    // if (!token) {
    //   throw new Error("You are not Authorized!");
    // }
    // const author = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    const userId = yield user_model_1.User.findOne({ email: req.user.userEmail });
    const blogData = {
        title,
        content,
        author: userId === null || userId === void 0 ? void 0 : userId._id,
    };
    const ressult = yield blog_service_1.blogServices.createBlogContentFromDB(blogData);
    // Logic to save blogData to database
    res.status(statusCode).json({ message: "Blog created successfully!", ressult });
}));
const getBlogContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogServices.getBlogContentFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Blog retrieved successfully',
        data: result,
    });
}));
const updateBlogContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogData = req.body;
        const blogid = req.params.id;
        const result = yield blog_service_1.blogServices.updateBlogContentFromDB(blogid, blogData);
        if (result) {
            res.status(200).json({
                message: 'Blog updated successfully',
                status: true,
                data: {
                    _id: result._id,
                    title: result.title,
                    content: result.content,
                    author: result.author,
                },
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while updating product',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
const deleteBlogContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogid = req.params.id;
        const result = yield blog_service_1.blogServices.deleteBlogContentByIdfromDB(blogid);
        if (result) {
            res.status(200).json({
                message: 'Blog deleted successfully',
                status: true,
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while deleting product',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
exports.blogController = {
    createBlogContent,
    getBlogContent,
    updateBlogContent,
    deleteBlogContent
};
// In user.controller.ts
