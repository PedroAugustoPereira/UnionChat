import config from "config";
import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";

import { excludedFields } from "../controllers/authController";
import { signJwt } from "../middlewares/jwt";
import Users, { UserDocument, UserType } from "../model/userModel";

const userService = {
    checkDataRegister: async (username: string, email: string) => {
        const usernameCheck = await Users.findOne({ username });
        const emailCheck = await Users.findOne({ email });
        if (usernameCheck || emailCheck) {
            return {
                status: false,
                message: "Usuário ou email já utilizado",
            };
        }

        return {
            status: true,
        };
    },

    createUser: async (
        username: string,
        email: string,
        password: string,
        role: null | string | undefined,
    ) => {
        if (role !== "admin") {
            role = "user";
        }

        const user = await Users.create({
            username,
            email,
            password,
            role,
        });

        return omit(user.toJSON(), excludedFields);
    },

    findUserById: async (id: string) => {
        const user = await Users.findById(id);

        if (user) {
            return omit(user, user!.password);
        }

        return false;
    },

    findAllUsers: async () => {
        return await Users.find();
    },

    findUser: async (query: FilterQuery<UserType>, options: QueryOptions = {}) => {
        return await Users.findOne(query, {}, options).select("+password");
    },

    //recebemos um topo userDocument
    signToken: async (user: UserDocument) => {
        //vamos com signjwt
        const access_token = signJwt(
            { sub: user._id }, // usamos como base do token o id do usuario, bem como
            {
                expiresIn: `${config.get<number>("accesTokenExpiresIn")}m`, //setamos o tempo de expiração do token em minutios
            },
        );

        //salvamos no redis (versões futuras)
        // redisClient.set(user._id.toString(), JSON.stringify(user), {
        //     EX: 60 * 60,
        // });

        return { access_token };
    },
};

export default userService;
