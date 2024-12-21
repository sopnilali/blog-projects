
import express from 'express';
import { blogController } from './blog.controller';

const router = express.Router();

router.post('/', blogController.createBlogContent)
router.get('/', blogController.getBlogContent)

export const blogRoutes = router;