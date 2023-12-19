import { NextFunction, Request, Response } from "express";

import userService from "../services/userService";

interface RequestWithLocals extends Request {
    locals: {
        user?: any; // Substitua `any` pelo tipo específico do usuário se souber o formato
        // Outras propriedades locais, se necessário
    };
}

const userController = {
    getMe: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = res.locals.user; //pegamos o usuario do locals após a verificação de token
            res.status(200).json({
                status: "success",
                data: {
                    user, //retornamos os dados do usuario sem a senha
                },
            });
        } catch (err: any) {
            next(err);
        }
    },

    getAllUsersHandler: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAllUsers();
            res.status(200).json({
                status: "success",
                result: users.length,
                data: {
                    users,
                },
            });
        } catch (err: any) {
            next(err);
        }
    },
};

export default userController;
