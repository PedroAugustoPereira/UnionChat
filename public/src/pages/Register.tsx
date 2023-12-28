import 'react-toastify/dist/ReactToastify.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
  ToastOptions,
} from 'react-toastify';
import styled from 'styled-components';

import Logo from '../assets/logo.png';
import AuthMiddleware from '../middlewares/auth';
import authService, { userRegister } from '../services/authService';

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<userRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLoggedIn = async () => {
    const logged = await AuthMiddleware();
    if (logged.data) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (await isLoggedIn()) {
        navigate("/chat");
      }
    };

    checkLoginStatus();
  }, []);

  const handleSubmit = async (data: React.FormEvent) => {
    data.preventDefault();
    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;
      const data = await authService
        .register({
          username,
          email,
          password,
          confirmPassword,
        })
        .catch((err) => {
          toast.error(err, toastOptions);
          return;
        });

      if (
        data?.status === "error" ||
        data?.status === "fail" ||
        data?.status === false
      ) {
        toast.error(data.message, toastOptions);
      } else {
        navigate("/login");
      }
    }
  };

  const handleValidation = () => {
    const { username, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("A senha e a confirmação não estão iguais!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username deve ser maior que 3 caracteres", toastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error("A senha deve ser maior que 3 caracteres", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <FormContainer>
          <form onSubmit={handleSubmit} action="">
            <div className="brand">
              <img src={Logo} alt="" />
              <h1>
                <span className="s1">nion</span>
                <span className="s2">Chat</span>{" "}
              </h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />

            <button type="submit">Create User</button>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </FormContainer>
      </div>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0rem;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }
    h1 {
      color: white;
      position: relative;
      left: -33px;
      top: 18px;
      font-size: 24px;

      .s1 {
        text-transform: none;
        color: #02eae7;
      }
      .s2 {
        text-transform: none;
        color: #fdc804;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 1rem 5rem;
    filter: drop-shadow(2px 4px 6px black);
    box-shadow: 0px 1px 3px 0px #0000005e;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0%.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
