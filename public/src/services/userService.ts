import getAuthToken from '../middlewares/getAuthToken';
import Api from './Api';

const userService = {
  requireUser: async () => {
    if (!getAuthToken) {
      return {
        error: true,
        message: "O usuário não está logado!",
        status: 401,
        data: null,
      };
    }

    const user = await Api.get("/api/users/me").catch((err) => {
      if (err.response.status === 401 || err.response.status === 404) {
        return {
          error: true,
          message: "O usuário não está logado!",
          status: 401,
          data: null,
        };
      }

      return err;
    });

    return user;
  },
};

export default userService;
