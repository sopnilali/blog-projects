import express from 'express'
import {  UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/register', UserController.createUser)
router.get('/', auth(USER_ROLE.admin), UserController.GetUsers)


export const userRoutes = router;