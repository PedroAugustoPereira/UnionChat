import bcrypt from 'bcrypt';
import mongoose, { ObjectId } from 'mongoose';

export interface User {
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
//tipo padrão
export interface UserDocument extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    role?: string;
    isAvatarImageSet?: boolean;
    avatarImage?: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserWithoutPassword = Omit<User, "password">;

export const userSchema = new mongoose.Schema<UserDocument>(
    {
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

        role: {
            type: String,
            default: "user",
        },

        isAvatarImageSet: {
            type: Boolean,
            default: false,
        },
        avatarImage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    },
);

//emcriptar senha
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

//comparar senha
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ email: 1 });

const Users = mongoose.model<UserDocument>("Users", userSchema);


//tipo da schema
export type UserType = typeof userSchema;

export default Users;
