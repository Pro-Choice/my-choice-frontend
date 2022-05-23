import { React, useContext } from "react";
import Context from "../context/context";
import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Links color="inherit" href="https://mui.com/">
        My Choice
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };




const Register = ({ setAuth }) => {
  const context = useContext(Context);
  const { username, email, password } = context.inputs;

  console.log(username, email, password);

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {/* <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          onChange={(e) => onChange(e)}
          value={username}
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          onChange={(e) => onChange(e)}
          value={email}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          onChange={(e) => onChange(e)}
          value={password}
          type="password"
          name="password"
          placeholder="password"
        />
        <button>Submit</button>
        <Link to="/login">Login</Link>
      </form> */}

      {/* <img className="opacity-50"
              // className="rounded-circle"
              
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNCQXsPlh0Dd2t7dPUoH69EOfgHT8z_WL3Lg&usqp=CAU"
              width="700" height="400"
            /> */}

      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to My Choice
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => onChange(e)}
          value={username}
          type="text"
          name="username"
          placeholder="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField sx={{mb:2, width: 400}}
                  onChange={(e) => onChange(e)}
          value={email}
          type="email"
          name="email"
          placeholder="email"
                />
              </Grid>
            </Grid>

              
                <TextField sx={{mb:2, width: 400}}
                  onChange={(e) => onChange(e)}
          value={password}
          type="password"
          name="password"
          placeholder="password"
                />
              
              
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, and updates via email."
                />
              

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
};

export default Register;