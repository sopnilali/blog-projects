"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("../user/user.controller");
const router = express_1.default.Router();
router.post('/register', user_controller_1.UserController.createUser);
router.post('/login', auth_controller_1.AuthController.loginUser);
router.post('/refresh', auth_controller_1.AuthController.refreshToken);
exports.authRoutes = router;
