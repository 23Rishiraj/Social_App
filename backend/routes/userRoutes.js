import express from 'express';
import { getUserProfile, signupUser, loginUser, logoutUser, followunfollowUser,updateUser  } from '../controllers/userController.js';
import protectRoutes from "../middlewares/protectRoutes.js"
const router = express.Router();

router.get('/profile/:query',getUserProfile);
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/follow/:id',protectRoutes,followunfollowUser);// toggle the follow and unfollow
router.put('/update/:id',protectRoutes,updateUser);

export default router;