import express from 'express';
import { blogPost, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlog, updateBlog,  } from '../controllers/blogController.js';
import { authenticateUser, authorizeUser }  from '../middlewares/auth.js';

const router = express.Router();

router.post('/post', authenticateUser, authorizeUser("Author"), blogPost);
router.delete('/delete/:id', authenticateUser, authorizeUser("Author"), deleteBlog);
router.get('/allblogs', getAllBlogs);
router.get('/singleBlog/:id', authenticateUser, getSingleBlog);
router.get('/myBlogs', authenticateUser, authorizeUser("Author"), getMyBlogs);
router.put('/update/:id', authenticateUser, authorizeUser("Author"), updateBlog);

export default router;