import express from 'express';
import { getUserProfile, signupUser, loginUser, logoutUser, followunfollowUser,updateUser,getSuggesteduser,freezeAccount  } from '../controllers/userController.js';
import protectRoutes from "../middlewares/protectRoutes.js"
const router = express.Router();

router.get('/profile/:query',getUserProfile);
router.get('/suggested',protectRoutes,getSuggesteduser);
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/follow/:id',protectRoutes,followunfollowUser);// toggle the follow and unfollow
router.put('/update/:id',protectRoutes,updateUser);
router.put('/freeze',protectRoutes,freezeAccount);


export default router;