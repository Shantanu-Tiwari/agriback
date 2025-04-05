import express from "express";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import uploadController from "../controllers/uploadController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', protect ,  uploadMiddleware, uploadController);

export default router;

// import express from "express";
// import uploadMiddleware from "../middleware/uploadMiddleware.js";
// import { uploadFarmer, uploadCow } from "../controllers/uploadController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // 🟢 Route for Farmer model
// router.post("/farmer", protect, uploadMiddleware, uploadFarmer);

// // 🐄 Route for Cow model
// router.post("/cow", protect, uploadMiddleware, uploadCow);

// export default router;
