import express from 'express'
import {  UserController } from './user.controller';
import { authValidationSchema } from './user.validation';

const router = express.Router();

router.post('/register', UserController.createUser)
router.get('/', UserController.GetUsers)


export const userRoutes = router;