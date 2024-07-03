import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
} from "../../controllers/comment/index.js";

// Auth Router
const commentRouter = express.Router();

// Auth Routes
commentRouter.post("/new", createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:id", deleteComment);

// Export Auth Router
export default commentRouter;
