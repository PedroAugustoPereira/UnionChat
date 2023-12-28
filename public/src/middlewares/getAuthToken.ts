const getAuthToken = () => {
  const authToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("accessToken="));

  const loginIn = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("logged_in="));

  if (authToken?.split("=")[1] !== null) {
    if (loginIn?.split("=")[1] === "true") {
      return true;
    }
  }

  return false;
};

export default getAuthToken;
