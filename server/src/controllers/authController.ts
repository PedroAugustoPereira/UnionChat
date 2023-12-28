import config from "config";
import { CookieOptions, NextFunction, Request, Response } from "express";

import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import userService from "../services/userService";
import AppError from "../utils/appError";

//usado para excluir a password de um objeto que talvez vai ser passado para o front
export const excludedFields = ["password"];

//criando uma variavel que receve e ainda não cria o cookie que vai guardar o token, são apenas as configurações
const accesTokenCookieOptions: CookieOptions = {
    expires: new Date(Date.now() + config.get<number>("accesTokenExpiresIn") * 60 * 1000), //criamos uma data e usamos um dado do .env para definir quando expira
    maxAge: config.get<number>("accesTokenExpiresIn") * 60 * 1000, //maximo de tempo que  token pode atingir
    httpOnly: true, //apenas para o protocolo http
    sameSite: "lax", //medida de segurança.
};

if (process.env.NODE_ENV === "production") {
    //verificamos se estamos em produção
    accesTokenCookieOptions.secure = true;
}

const usersController = {
    //função de registro
    register: async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
        console.log(req.body);

        const { username, email, password, role } = req.body; //pega dados do body
        //note que como parameto, esperanmos no req o CreateUserInoput do nosso zod schema, ou seja se não bater com as definições, teremos erros

        try {
            //vai checar se já existe um nomme igual
            const usernameCheck = await userService.checkDataRegister(username, email);

            //verificação  do nome
            if (!usernameCheck.status) {
                return res.status(400).json({ status: false, message: usernameCheck.message });
            }

            //cria um novo usuário com nosso model

            const user = await userService.createUser(username, email, password, role);

            //verufica se usuario foi criado com sucesso
            if (user) {
                return res.json({ status: true, data: { user } });
            }

            return res.status(400).json({ status: false });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ status: false, message: error.message });
            }

            //next em error
            next(error);
        }
    },

    login: async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
        //imediatamente vimos que temos o tipo LoginUserInput participando de req ára validar os dados

        try {
            //verificamos se um usuario com esse nome existe
            const user = await userService.findUser({ username: req.body.username });

            //se não existe ou as senhas não batem, mandamos um dos nossos erros com AppError
            if (!user || !(await user.comparePassword(req.body.password))) {
                return next(new AppError("Invalid email or password", 401, false));
            }

            //se existe vamos usar o servico de usuario para criar um token
            const { access_token } = await userService.signToken(user);

            //crria o token na resposta, e seta as opções
            res.cookie("accessToken", access_token, accesTokenCookieOptions);
            res.cookie("logged_in", true, {
                //cria token que definie que o usuario está logado
                ...accesTokenCookieOptions,
                httpOnly: false,
            });

            //devolve o teoken e com status de successo
            res.status(200).json({
                status: true,
                access_token,
            });
        } catch (err) {
            next(err);
        }
    },
};

export default usersController;
