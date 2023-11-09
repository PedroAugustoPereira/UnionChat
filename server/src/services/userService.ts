import bcrypt from "bcrypt";

import Users, { UserResponse } from "../model/userModel";

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

    createUser: async (username: string, email: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
        });

        const User: UserResponse = {
            username: user.username,
            email: user.email,
            isAvatarImageSet: user.isAvatarImageSet,
            id: user._id,
            avatarImage: user?.avatarImage,
        };

        return User;
    },
};

export default userService;
