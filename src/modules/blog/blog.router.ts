
import express from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), blogController.createBlogContent)
router.get('/', auth(USER_ROLE.user), blogController.getBlogContent)
router.put('/:id', auth(USER_ROLE.user), blogController.updateBlogContent)
router.delete('/:id', auth(USER_ROLE.admin), blogController.deleteBlogContent)


export const blogRoutes = router;