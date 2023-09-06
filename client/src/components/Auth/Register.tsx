import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Chip } from '@mui/material';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant/constant';
import userApi from '../../apis/userApi';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
    gender: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await userApi.register(data);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);

  return (
    <>
      {!accessToken ? (
        <ThemeProvider theme={defaultTheme}>
          <br />
          <br />
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
                Sign up
              </Typography>
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstname"
                      required
                      fullWidth
                      id="firstname"
                      label="First Name"
                      value={data.firstname}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      name="lastname"
                      autoComplete="family-name"
                      value={data.lastname}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={data.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8.4}>
                    <FormControl>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        className="text-left"
                      >
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={data.gender}
                        onChange={handleInputChange}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6.7}>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="mr-5"
                    >
                      Role
                    </FormLabel>
                    <Chip
                      label="Instructor"
                      onClick={() => setData({ ...data, role: 'instructor' })}
                      color={
                        data.role === 'instructor' ? 'primary' : 'default'
                      } // Thay đổi màu khi được chọn
                      style={{ cursor: 'pointer', marginRight: '8px' }}
                    />
                    <Chip
                      label="Student"
                      onClick={() => setData({ ...data, role: 'student' })}
                      color={
                        data.role === 'student' ? 'primary' : 'default'
                      } // Thay đổi màu khi được chọn
                      style={{ cursor: 'pointer' }}
                    />
                  </Grid>
                </Grid>
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
                    <Link to="/login">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
}
