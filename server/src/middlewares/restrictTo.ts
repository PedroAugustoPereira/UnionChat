import { NextFunction, Request, Response } from "express";

import AppError from "../utils/appError";

export const restrictTo =
    (
        ...allowedRoles: string[] //recebe um array de string
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user; //pega o usuario

        if (!allowedRoles.includes(user.role)) {
            //verifica se a string da role do usuario ta presente no array de strings
            return next(new AppError("You are not  allowed to perfom this action ", 403));
        }

        next();
    };
