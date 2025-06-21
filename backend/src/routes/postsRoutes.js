//routes/postsRoutes.js

import express from "express";
import { deletePost, getAllPosts, createPost, updatePost, getOnePost } from "../controllers/postsController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.post("/", authenticate, createPost);
router.delete("/:id", authenticate, deletePost);
router.put("/:id", authenticate, updatePost);





export default router;

