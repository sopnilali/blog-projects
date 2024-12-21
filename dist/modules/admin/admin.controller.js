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
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const AdminBlockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield admin_service_1.AdminService.UserBlockFromAdmininDB(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found ! !');
        }
        // Update the isBlocked property
        user.isBlocked = true;
        yield user.save();
        res.status(200).json({
            success: true,
            message: 'User blocked successfully',
            statusCode: 200,
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "not found");
    }
});
const DeleteBlogContentFromAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield admin_service_1.AdminService.deleteBlogContentFromAdminDB(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found ! !');
        }
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: 200,
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "not found");
    }
});
exports.adminController = {
    AdminBlockUser,
    DeleteBlogContentFromAdmin
};
