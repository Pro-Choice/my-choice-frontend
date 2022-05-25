
import {useEffect} from "react";
//import Context from "../context/context";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserQuestions from "./UserQuestions";

import { useContext, useState } from "react";
import Context from "../context/context";
import React from "react";

// import React from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
// import Mapbox from './Mapbox';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Mapbox from "./Mapbox";

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
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';



const drawerWidth = 240;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
function mapNum(){
  console.log(context.flag)
}


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
    console.log(context.flag)
    context.setFlag(false)
    console.log(context.flag, "this work")
  }, [context.newQuestion], [context.userInfo]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const onChange = (e) => {
    context.setQuestion(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //console.log(context.question);
  console.log(context.userInfo.username)
  return (
    <>


    <Box sx={{ mt:7}}>

    <Grid container spacing={2} columns={2}>
      
      <Grid  sx={{ mt:6, ml:8, width: 900 }}>
        < UserQuestions />
      </Grid>

      <Grid   >
        <Box sx={{ mt:6, ml:10, width: 400, position: 'fixed' }}>
            <UserInfo  userInfo={context.userInfo} />
        </Box>
        <Card sx={{ minWidth: 275, position: 'fixed', ml:10, mt:55, width: 400 }}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Questions asked: 0
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Questions answerd: 0
        </Typography>
      </CardContent>
      
      </Card>
       

      </Grid>
    </Grid>

      


      <button onClick={(e) => logout(e)}>Logout</button>
      <h2>{`Hello `}</h2>
      <Link to="/browse" >Browse</Link>

      
      
    </Box>

      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {context.userInfo.username}
          </Typography>

          <Button sx={{ml:150, bgcolor: 'white', color:"blue" }} variant="contained" onClick={(e) => logout(e)}> Logout</Button> 

      

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
                <ListItemButton onClick={mapNum} >
                    <Link  to="/map">
                      <ListItemText onClick={mapNum}  primary="Home" />
                    </Link> 
                
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                <Button onClick={handleOpen}> Ask a question!</Button>

                </ListItemButton>
              </ListItem> 

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                <div className='text1'>
                  <TextField sx={{ width: 300, height: 100, ml:1}} className="text2"  id="outlined-search" label="Type here" type="text" onChange={(e) => onChange(e)} value={context.question} name="post"/>
                  <Button sx={{ height: 55, width: 70, ml:1}} onClick={postQuestion} variant="contained">POST</Button>
                </div>
                </Box>
              </Modal>

              
          
          </List>
          <Divider />
          <List>
            {['All messages'].map((text, index) => (
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
      
    </Box>



    </>
  );
};

export default Dashboard;