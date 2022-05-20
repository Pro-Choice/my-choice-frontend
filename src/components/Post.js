import Context from "../context/context";
import {useContext} from "react"
const Post = (props) => {
  const { content, id } = props;
  const context = useContext(Context);

  const onClick = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/dashboard/questions/${id}`, {
            method: "DELETE",
            headers: {
              token: localStorage.token,
              "Content-Type": "application/json",
            }
        })
        const parseRes = await response.json();
        context.setNewQuestion(parseRes)
      } catch (error) {
          console.error(error);
      }
  }

  const getAnswers = async (e) => {
    console.log("hit", id)
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/dashboard/questions/${id}`, {
          method: "GET",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          }
      })
      const parseRes = await response.json();
      context.setAnswers(parseRes)
      console.log(context.answers)
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div>
      <p>{content}</p>
      <button onClick = {e => onClick(e)}>Delete Question</button>
      <button onClick = {e => getAnswers(e)}>Answers</button>
      
      <div>
      </div>
    </div>
  );
};

export default Post;
