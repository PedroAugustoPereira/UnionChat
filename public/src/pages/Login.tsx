import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import styled from "styled-components";

import Logo from "../assets/logo.png";
import authService, { userLogin } from "../services/authService";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<userLogin>({
    username: "",
    password: "",
  });

  const handleSubmit = async (data: React.FormEvent) => {
    data.preventDefault();
    console.log("entrou");
    if (handleValidation()) {
      console.log("validado");
      const { username, password } = values;
      const { data } = await authService.login({
        username,
        password,
      });

      if (data.status == false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status == true) {
        localStorage.setItem("union-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (username.length < 3) {
      toast.error("Username tem mais de 3 caracteres!", toastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error("A senha deve ser ter mais de 3 caracteres", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
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
              min="3"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <button type="submit">Login in</button>
            <span>
              Don'T have an account ? <Link to="/register">Register</Link>
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

export default Login;
