import express from "express";
import { createPost ,getPost ,deletePost ,likeUnlikePost ,replyToPost ,getFeedPost, getUserPost } from '../controllers/postController.js';
import protectRoutes from "../middlewares/protectRoutes.js";


const router =express.Router();

router.get("/feed",protectRoutes ,getFeedPost);
router.get("/:id",getPost);
router.get("/user/:username",getUserPost);
router.post('/create',protectRoutes ,createPost);
router.delete("/:id",protectRoutes ,deletePost);
router.put("/like/:id",protectRoutes ,likeUnlikePost);
router.put("/reply/:id",protectRoutes ,replyToPost);

export default router;