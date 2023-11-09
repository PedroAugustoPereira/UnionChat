import { Request, Response } from "express";

import userService from "../services/userService";

const usersController = {
    register: async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        try {
            const usernameCheck = await userService.checkDataRegister(username, email);

            if (!usernameCheck.status) {
                res.status(400).json({ message: usernameCheck.message });
            }

            const user = await userService.createUser(username, email, password);

            if (user) {
                return res.json({ status: true, user });
            }

            return res.status(400).json({ status: false });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
            }
        }
    },
};

export default usersController;
