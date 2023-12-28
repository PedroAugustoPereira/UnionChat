import express from 'express';

import userController from '../controllers/userController';
import { desserializeUser } from '../middlewares/desserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { restrictTo } from '../middlewares/restrictTo';

const userRouter = express.Router();

//middlewares que excutam antes de cada chamada de rota.
userRouter.use(desserializeUser, requireUser);

/**ADMIN ROUTES **/
//olhar o restric to
userRouter.get("/", restrictTo("admin"), userController.getAllUsersHandler);

//PUBLIC GET ROUTES
userRouter.get("/me", userController.getMe);

//PUBLIC POST ROUTES
// userRouter.post("/register", usersController.);

export default userRouter;
