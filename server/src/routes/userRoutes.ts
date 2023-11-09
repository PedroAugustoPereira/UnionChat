import express from "express";

import usersController from "../controllers/usersController";

const userRouter = express.Router();

userRouter.post("/register", usersController.register);

export default userRouter;
