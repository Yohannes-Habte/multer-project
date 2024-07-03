import express from "express";
import multer from "multer";
import path from "path";
import { body } from "express-validator";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  userLogout,
} from "../../controllers/user/index.js";

// Auth Router
const userRouter = express.Router();

// Step 1: Setting up Multer Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Unique filename
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Step 2: Creating the Upload Middleware
const upload = multer({ storage: storage });

// Step 3: Validating the Uploaded Image
const validateImg = body("image").custom((value, { req }) => {
  if (!req.file) {
    throw new Error("Please select an image");
  }

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "application/pdf",
  ];

  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    throw new Error("Only JPEG, PNG, and GIF images are allowed");
  }

  if (req.file.size > 1024 * 1024 * 5) {
    // 5MB limit
    throw new Error("Image size cannot exceed 5MB");
  }

  return true;
});
// Auth Routes
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", userLogout);
userRouter.delete("/:id", deleteUser);
userRouter.delete("/:id", getSingleUser);
userRouter.delete("/", getAllUsers);

// Export Auth Router
export default userRouter;
