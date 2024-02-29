import express from 'express';
import { getAllAuthors, getMyProfile, login, logout, register } from '../controllers/userController.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticateUser, logout);
router.get('/myprofile', authenticateUser, getMyProfile);
router.get('/authors', getAllAuthors);

export default router;