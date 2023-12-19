import { NextFunction, Request, Response } from "express";

import userService from "../services/userService";
import AppError from "../utils/appError";
import { verifyJwt } from "./jwt";

export const desserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //cria variavael que armazena o token
        let accessToken;

        //verifica se tem um jwt nos headers e salva na variavel
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            accessToken = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.accessToken) {
            //veririca se tem o cookie com o token
            accessToken = req.cookies.accessToken;
        }

        //se o não tivermos nenhum token o token é nulo
        if (!accessToken) {
            return next(new AppError("You are not logged in", 401));
        }

        //pegamos a validação ou não do token
        const decoded = verifyJwt<{ sub: string }>(accessToken);
        console.log(decoded);
        if (!decoded) {
            //se tivermos um nulo
            return next(new AppError(`Invalid token or user doesn't exist`, 401));
        }

        //pegamos a sessão do REDIS (FUTURAMENTE)
        // const session = await redisClient.get(decoded.sub);

        //se a sessão não existir temos um erro dizendo que ja foi expirado
        // if (!session) {
        //     return next(new AppError(`User session has expired`, 401));
        // }

        //verifica se o usuário exoste
        const user = await userService.findUserById(decoded.sub);

        if (!user) {
            return next(new AppError(`User with that token no longer exist`, 401));
        }

        //salva o usuario no locals
        res.locals.user = user;
        next();
    } catch (err: any) {
        next(err);
    }
};
