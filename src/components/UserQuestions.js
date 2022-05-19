import { useContext } from "react";
import Context from "../context/context";
import Post from "./Post";

const UserQuestions = (props) => {
  const context = useContext(Context);

  const userQuestions = context.userQuestions.map((element) => {
    return <Post key={element.id} content={element.content} />;
  });
  return <>{userQuestions}</>;
};

export default UserQuestions;
