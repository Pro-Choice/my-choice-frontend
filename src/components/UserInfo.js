import { useContext, useState } from "react";
import Context from "../context/context";
import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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


const UserInfo = (props) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const context = useContext(Context);
  let { username, first_name, last_name, bio } = props.userInfo;

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    if (!context.isEditing) {
      context.setIsEditing(true);
    } else {
      context.setIsEditing(false);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, bio } = context.inputs;

      const body = { first_name, last_name, bio };
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      context.setUserInfo(parseRes)
      context.setIsEditing(false)
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    // <div className = "user-info">
    //     <h2>{username}</h2>
    //     <h2>{first_name}</h2>
    //     <h2>{last_name}</h2>
    //     <h2>{bio}</h2>
    // </div>
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src="https://www.freeiconspng.com/uploads/female-icon-11.jpg"
            alt="Admin"
            className="rounded-circle"
            width="150"
          />
          <div className="mt-3">
            <h4>{username}</h4>
            <p className="text-secondary mb-1">{`${
              first_name ? first_name : ""
            } ${last_name ? last_name : ""}`}</p>
            <p className="text-muted font-size-sm">{bio ? bio : ""}</p>

            <Button 
            onClick={handleOpen}
              type="button"
              className="btn btn-dark btn-sm">Edit Profile</Button>


            {/* <button
              onClick={(e) => onClick(e)}
              type="button"
              className="btn btn-dark btn-sm"
            >
              Edit Profile
            </button> */}

            
            {context.isEditing === true && (
              <form onSubmit={onSubmitForm}>
                <input
                  onChange={(e) => onChange(e)}
                  value={context.first_name}
                  type="text"
                  name="first_name"
                  placeholder="First name"
                />
                <input
                  onChange={(e) => onChange(e)}
                  value={context.last_name}
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                />
                <input
                  onChange={(e) => onChange(e)}
                  value={context.bio}
                  type="text"
                  name="bio"
                  placeholder="Bio"
                />
                <button>Submit</button>
              </form>
            )}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={onSubmitForm}>
                <input
                  onChange={(e) => onChange(e)}
                  value={context.first_name}
                  type="text"
                  name="first_name"
                  placeholder="First name"
                />
                <input
                  onChange={(e) => onChange(e)}
                  value={context.last_name}
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                />
                <input
                  onChange={(e) => onChange(e)}
                  value={context.bio}
                  type="text"
                  name="bio"
                  placeholder="Bio"
                />
                <button>Submit</button>
              </form>
        </Box>
      </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;