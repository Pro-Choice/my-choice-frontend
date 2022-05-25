import Context from "../context/context";
import { React, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserQuestions from "./UserQuestions"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const Post = (props) => {
  const { content, id } = props;
  const context = useContext(Context);

  const onClick = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3001/dashboard/questions/${id}`, {
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

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard", {
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

  useEffect(() => {
    getUserInfo();
  }, [context.newQuestion], [context.userInfo]);

   console.log(context.userInfo.username)
  return (
    <div>
      
   
    <Card className ="post Prev-post" sx={{ maxWidth: 700,  ml: 40, mb:5 }}>
      
      <CardContent>
      <Grid container spacing={2}>
        
          <img
            className="rounded"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              width="65" height="65"
            />
          <Typography gutterBottom variant="h6" component="div" sx={{ml:3}}>
          <h4>{context.userInfo.username}</h4>
          </Typography>
        </Grid>
        <Typography variant="body2" color="text.secondary">
       {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">comments</Button>
        <Button onClick = {e => onClick(e)}  size="small">Delete Question </Button>
      </CardActions>
      
    </Card>
     </div>
  );
};

export default Post;
