import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoutes";
import connectDB from "./utils/connectDB";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// 5. Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Testing
app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Union",
    });
});

// Rotas desconhecidas
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

const port = config.get<number>("port");
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // ? call the connectDB function here
    connectDB();
});
