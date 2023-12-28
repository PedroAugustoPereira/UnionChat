import express from 'express';

import authController from '../controllers/authController';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  loginUserSchema,
} from '../schemas/user.schema';

const authRouter = express.Router();

// Register user route
// executa o validadte com o tipo createUserSchema do zod
authRouter.post("/register", validate(createUserSchema), authController.register);

// Login user route
//executa o validate com o loginUserChema do zod
authRouter.post("/login", validate(loginUserSchema), authController.login);

export default authRouter;
