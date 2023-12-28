import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthMiddleware from '../middlewares/auth';

const Chat = () => {
  const navigate = useNavigate();

  const isLoggedIn = async () => {
    const logged = await AuthMiddleware();
    if (logged.data !== null) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!(await isLoggedIn())) {
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <div>
        <p>CHATS</p>
      </div>
    </>
  );
};

export default Chat;
