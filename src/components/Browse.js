import { React, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/context";
import Post from "./Post";
import UserQuestions from "./UserQuestions";


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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


const Browse = ({ setAuth }) => {
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
    return <Post key={element.id} content={element.content} />;
  });

  useEffect(() => {
    getAllQuestions();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>


      
    <Box sx={{ mt:7}}>
    
      
    
      {/* <button onClick={(e) => logout(e)}>Logout</button> */}
      <h2>{`Hello `}</h2>
      <Link to="/browse">Browse</Link>
      
    </Box>

      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Browse
          </Typography>

          <Button sx={{ml:140, bgcolor: 'white', color:"blue" }} variant="contained" onClick={(e) => logout(e)}> Logout</Button> 


          {/* <Button sx={{ml:140, bgcolor: 'white', color:"blue" }} variant="contained" onClick={(e) => logout(e)}> Logout</Button>  */}


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
                    <Link to="/map">
                      <ListItemText  primary="Home" />
                    </Link> 
                
                </ListItemButton>
              </ListItem>

               <ListItem disablePadding>
                <ListItemButton>
                    
                       <Link to="/dashboard">Dashboard</Link>
                   
                
                </ListItemButton>
              </ListItem>

              
          
          </List>
          <Divider />
          <List>
            {['All mail'].map((text, index) => (
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
      
      

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <UserQuestions />
        </Grid>
      </Grid>


     
    
     
     
      
    </Box>



    </>

    
  );
};

export default Browse;
