import { boolean, object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        username: string({ required_error: "Name is required" }),
        email: string({ required_error: "Email is required" }).email("Invalid Email"),
        password: string({ required_error: "Password is required" })
            .min(8, "A senha deve ter no mínimo 8 caracteres")
            .max(32, "A senha deve ter no máximo 32 caracteres"),
        passwordConfirm: string({ required_error: "Password Confirm is required" }),
        isAvatarImageSet: boolean({ required_error: "Type isAvatarSet ivalid" }).optional(),
        avatarImage: string({ required_error: "Type Error avatar Image" }).optional(),
        role: string().optional(),
    }).refine((data) => data.passwordConfirm === data.password, {
        path: ["passwordConfirm"],
        message: "Password do not match",
    }),
});

export const loginUserSchema = object({
    body: object({
        username: string({ required_error: "Username is required" }),
        password: string({ required_error: "Password is required" }).min(
            8,
            "Invalid username or Password",
        ),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
