import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

const port = Number(process.env.PORT || 8000);
const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
}));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/v1/users", userRoutes);

const start = async () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not configured");
    }

    const connectionDb = await mongoose.connect(mongoUri);
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
    server.listen(port, () => {
        console.log(`LISTENING ON PORT ${port}`);
    });
};

start().catch((error) => {
    console.error("Backend failed to start:", error);
    process.exitCode = 1;
});
