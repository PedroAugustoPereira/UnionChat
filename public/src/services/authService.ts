import Api from './Api';

export type userRegister = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const authService = {
  register: async (params: userRegister) => {
    if (params.password !== params.confirmPassword) {
      return new Error("Senha e confirmação de senha são diferentes");
    }

    const header = {
      username: params.username,
      email: params.email,
      password: params.password,
    };

    const res = await Api.post("/api/auth/register", header).catch((err) => {
      if (err.response.status == 400) {
        return err.response;
      }

      return err;
    });

    return res;
  },
};

export default authService;
