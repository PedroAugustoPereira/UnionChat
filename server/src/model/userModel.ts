import mongoose from "mongoose";

interface User {
    username: string;
    email: string;
    password: string;
    isAvatarImageSet?: boolean;
    avatarImage?: string;
}

export interface UserResponse {
    username: string;
    email: string;
    isAvatarImageSet?: boolean;
    avatarImage?: string;
    id?: any;
}

export type UserWithoutPassword = Omit<User, "password">;

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
