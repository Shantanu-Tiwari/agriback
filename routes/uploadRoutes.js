import express from "express";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import uploadController from "../controllers/uploadController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', protect ,  uploadMiddleware, uploadController);

export default router;