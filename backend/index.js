import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./database/index.js";

// Routes
import userRouter from "./routes/user/index.js";
import commentRouter from "./routes/comment/index.js";

// Express app
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://inventory-management-app"],
    credentials: true,
  })
);
app.use(express.json());

dotenv.config();

// end points
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);

// Static assets
app.use(express.static("uploads"));

// Port
const port = process.env.PORT || 4000;

// Server listener
app.listen(port, () => {
  console.log(`The server starts on port ${port}`);
});
