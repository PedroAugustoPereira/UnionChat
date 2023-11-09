import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/userRoutes";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);

const db_url = process.env.MONGO_URL || "4000";
console.log(process.env.MONGO_URL);

mongoose
    .connect(db_url)
    .then(() => {
        console.log("DB connection sucessfuly");
    })
    .catch((err) => {
        console.log("Error: " + err.message);
    });

const server = app.listen(process.env.PORT, () => {
    console.log("Server has been start");
});
