import express from "express"
import postsRoutes from "./routes/postsRoutes.js";
import authRoutes from "./routes/auth.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/posts", postsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server started on Port: ${PORT}`);
    });
});