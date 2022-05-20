import { React, useEffect, useContext } from "react";
import Context from "../context/context";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserQuestions from "./UserQuestions";
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from './Mapbox';

const Dashboard = ({ setAuth }) => {
  const context = useContext(Context);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      context.setUserInfo(parseRes.userInfo.userData);
      context.setUserQuestions(parseRes.userInfo.userQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  const postQuestion = async (e) => {
    e.preventDefault();
    try {
      const body = { question: context.question };
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      context.setNewQuestion(parseRes)
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(context.userInfo)
  // console.log(context.userQuestions)
  useEffect(() => {
    getUserInfo();
  }, [context.newQuestion], [context.userInfo]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const onChange = (e) => {
    context.setQuestion(e.target.value);
  };

  console.log(context.question);
  // console.log(context.userInfo)
  return (
    <>
      <h1>Dashboard</h1>
      <UserInfo userInfo={context.userInfo} />
      <UserQuestions />
      <form onSubmit={postQuestion}>
        <input
          onChange={(e) => onChange(e)}
          value={context.question}
          type="text"
          name="post"
          placeholder="Ask a question"
        />
        <button>Post</button>
      </form>
      <button onClick={(e) => logout(e)}>Logout</button>
      <h2>{`Hello `}</h2>
      <Link to="/browse">Browse</Link>
      <Mapbox />
      <ul className='list'>List of states that Ban abortions
        <li>Alabama</li>
        <li>Arizona</li>
        <li>Arkansas</li>
        <li>Michigan</li>
        <li>Mississippi</li>
        <li>Oklahoma</li>
        <li>West Virginia</li>
        <li>Wisconsin</li>
      </ul>
    </>
  );
};

export default Dashboard;
