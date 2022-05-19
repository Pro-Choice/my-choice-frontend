import { React, useContext } from "react";
import Context from "../context/context";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const context = useContext(Context);
  const { username, email, password } = context.inputs;

  console.log(username, email, password);

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const response = await fetch("http://localhost:3000/auth/register", {
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
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          onChange={(e) => onChange(e)}
          value={username}
          type="text"
          name="username"
          placeholder="username"
        />
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
        <Link to="/login">Login</Link>
      </form>
    </>
  );
};

export default Register;
