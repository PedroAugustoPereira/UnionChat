import userService from '../services/userService';

const AuthMiddleware = async () => {
  const response = await userService.requireUser();

  if (response.error) {
    return {
      data: null,
      error: true,
    };
  }

  return {
    data: response,
  };
};

export default AuthMiddleware;
