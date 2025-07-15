import express from 'express';
import protectRoutes from '../middlewares/protectRoutes';
const router = express.Router();

router.post("/",protectRoutes,sendMessage);

export default router;