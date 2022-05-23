
import { React, useEffect, useContext } from "react";
import Context from "../context/context";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserQuestions from "./UserQuestions";
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from './Mapbox';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Dashboard = ({ setAuth }) => {
  const context = useContext(Context);

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

  const postQuestion = async (e) => {
    e.preventDefault();
    try {
      const body = { question: context.question };
      const response = await fetch("http://localhost:3000/dashboard", {
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
    <Box sx={{ mt:7}}>
      <UserInfo userInfo={context.userInfo} />
      
      <div className='text1'>
        <TextField sx={{ width: 500, height: 100, ml:45}} className="text2"  id="outlined-search" label="Type here" type="text" onChange={(e) => onChange(e)} value={context.question} name="post"/>
        <Button sx={{ height: 55, width: 70, ml:2}} onClick={postQuestion} variant="contained">POST</Button>
      </div>
      <UserQuestions />
      <button onClick={(e) => logout(e)}>Logout</button>
      <h2>{`Hello `}</h2>
      <Link to="/browse">Browse</Link>
      
    </Box>

      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>

          <Button sx={{ml:140, bgcolor: 'white', color:"blue" }} variant="contained" onClick={(e) => logout(e)}> Logout</Button> 


        </Toolbar>
          
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem disablePadding>
                <ListItemButton>
                    <Link to="/browse">
                      <ListItemText  primary="Browse" />
                    </Link> 
                
                </ListItemButton>
              </ListItem>

               <ListItem disablePadding>
                <ListItemButton>
                    <Link to="/home">
                      <ListItemText  primary="home" />
                    </Link> 
                
                </ListItemButton>
              </ListItem>

              
          
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <div>
        <Mapbox />
      </div>
    </Box>



    </>
  );
};

export default Dashboard;



