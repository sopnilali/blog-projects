import express from 'express';
import { authValidationSchema } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { UserController } from '../user/user.controller';

const router = express.Router();

router.post('/register', UserController.createUser)
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.refreshToken)


export const authRoutes = router;