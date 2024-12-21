
import express from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), blogController.createBlogContent)
router.get('/', blogController.getBlogContent)
router.patch('/:id', auth(USER_ROLE.user), blogController.updateBlogContent)
router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogController.deleteBlogContent)


export const blogRoutes = router;