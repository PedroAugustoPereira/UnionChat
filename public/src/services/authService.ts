import Api from "./Api";

export type userRegister = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type userLogin = {
  username: string;
  password: string;
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

  login: async (params: userLogin) => {
    const res = await Api.post("/api/auth/login", params).catch((err) => {
      if (err.response.status == 400) {
        return err.response;
      }

      return err;
    });

    return res;
  },
};

export default authService;
