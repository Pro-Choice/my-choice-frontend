import { React, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/context";
import Post from "./Post";
import Navbar from "./Navbar";

const Browse = () => {
  const context = useContext(Context);
  const getAllQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/browse", {
        method: "GET",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
      });
      const parseRes = await response.json();
      context.setAllQuestions(parseRes);
    } catch (error) {
      console.error(error);
    }
  };

  const userQuestions = context.allQuestions.map((element) => {
    return <Post  id = {element.id} key={element.id} content={element.content} />;
  });

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <>
    <Navbar/>
      <h1>Browse</h1>
      <div>{userQuestions}</div>
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default Browse;
