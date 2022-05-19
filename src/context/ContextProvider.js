import { useState } from "react";
import Context from "./context";

const ContextProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    first_name:"",
    last_name: "",
    bio: ""
  });

  const [userInfo, setUserInfo] = useState({});

  const [userQuestions, setUserQuestions] = useState([]);

  const [allQuestions, setAllQuestions] = useState([]);

  const [question, setQuestion] = useState("");

  const [newQuestion, setNewQuestion] = useState("")

  const [isEditing, setIsEditing] = useState(false)

  const state = {
    inputs,
    setInputs,
    userInfo,
    setUserInfo,
    userQuestions,
    setUserQuestions,
    question,
    setQuestion,
    newQuestion,
    setNewQuestion,
    allQuestions, 
    setAllQuestions,
    isEditing,
    setIsEditing
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default ContextProvider;
