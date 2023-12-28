import Api from './Api';

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
      return {
        data: null,
        status: "error",
        message: "Senha e confirmação de senha são diferentes!",
      };
    }

    const header = {
      username: params.username,
      email: params.email,
      password: params.password,
      passwordConfirm: params.confirmPassword,
    };

    const res = await Api.post("/api/auth/register", header).catch((err) => {
      if (
        err.response.status === 400 ||
        err.response.data.status === "error" ||
        err.response.data.status === "fail"
      ) {
        return err.response.data;
      }

      return err;
    });

    const response = {
      data: res.data,
      status: res.status,
      message: res.message,
    };

    console.log(res);
    return response;
  },

  login: async (params: userLogin) => {
    const res = await Api.post("/api/auth/login", params).catch((err) => {
      if (
        err.response.status === 400 ||
        err.response.data.status === "error" ||
        err.response.data.status === "fail"
      ) {
        return err.response.data;
      }

      return err;
    });

    const response = {
      data: res.data,
      status: res.status,
      message: res.message,
    };

    return response;
  },
};

export default authService;
