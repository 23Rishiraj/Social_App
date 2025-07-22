import express from 'express';
import protectRoutes from '../middlewares/protectRoutes.js';
import { sendMessage } from '../controllers/messageController.js';
import { getMessages } from '../controllers/messageController.js';
import { getConversations } from '../controllers/messageController.js';

const router = express.Router();

router.get("/:conversations",protectRoutes,getConversations);
router.get("/:otherUserId",protectRoutes,getMessages);
router.post("/",protectRoutes,sendMessage);


export default router;