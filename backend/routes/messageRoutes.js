import express from 'express';
import protectRoutes from '../middlewares/protectRoutes.js';
import { sendMessage } from '../controllers/messageController.js';
import { getMessages } from '../controllers/messageController.js';
import { getConverations } from '../controllers/messageController.js';

const router = express.Router();

router.get("/:conversations",protectRoutes,getConverations);
router.get("/:otherUserId",protectRoutes,getMessages);
router.post("/",protectRoutes,sendMessage);


export default router;