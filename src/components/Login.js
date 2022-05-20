import { React, useContext } from "react";
import Context from "../context/context";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const context = useContext(Context);
  const { email, password } = context.inputs;

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          onChange={(e) => onChange(e)}
          value={email}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          onChange={(e) => onChange(e)}
          value={password}
          type="password"
          name="password"
          placeholder="password"
        />
        <button>Submit</button>
        <Link to="/register">Register</Link>
      </form>
    </>
  );
};

export default Login;
