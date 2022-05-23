import React from 'react';
// import Navbar from './Navbar';
// import { Nav, NavLink, NavMenu } from "./NavbarElements"
//import "./Styling/Home.css"
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';


const Home = () => {

  return (
    <div>
      

      <h2 className='motto'>My body my life my choice</h2>
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

      <List
      sx={{
        ml: 50,
        width: '100%',
        maxWidth: 360,
        // bgcolor: 'text.disabled',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    > 
      {["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`${sectionId}`}</ListSubheader>
          </ul>
        </li>
      ))}
    </List>
        
    </div>
  );
};
  
export default Home;