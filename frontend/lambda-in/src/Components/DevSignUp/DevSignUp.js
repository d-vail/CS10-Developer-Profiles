import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../DevSignUp/DevSignUp.css';

export default class DevSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'bat',
      lastName: 'man',
      email: 'abc@xyz.com',
      password: '12345678Aa$',
      confirmPassword: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handNewUser = event => {
    event.preventDefault();

    /**
     * VALIDATE password input.
     * @description Validate that `password` and `confirmPassword` fields match.
     */
    if (this.state.password !== this.state.confirmPassword) {
      alert("Your passwors don't match. Please try again!");
      this.setState({
        password: '',
        confirmPassword: '',
      });
      return;
    }

    axios
      .post('/api/register/seekers', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        summary: ' boo',
      })
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('_id', response.data.newUser._id);
        /**
         * SET GLOBAL STATE
         */
        this.props.setGS({
          userInfo: { ...response.data.newUser }, // Set user data.
          isSignedIn: true,
          userType: 'seeker',
        });
        // RESET local state
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          summary: '',
        });

        console.log(response);
        console.log(localStorage.getItem('token'));
      })
      .catch(err => {
        this.setState({
          password: '',
          confirmPassword: '',
        });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="signupContainer">
        <div className="formConatiner">
          <Paper className="paper">
            <div className="form2">
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Lambda Network
                </Typography>

                <Typography variant="headline" gutterBottom align="center">
                  Sign Up
                </Typography>
              </div>
              {/* look at https://material-ui.com/demos/text-fields/ for documentaition */}
              <TextField
                id="firstName"
                label="First Name"
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                margin="normal"
              />

              <TextField
                id="lastName"
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                margin="normal"
              />

              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />

              <TextField
                id="password"
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal"
              />

              <TextField
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                margin="normal"
              />
              <br />
              <Button variant="contained" color="primary" onClick={this.handNewUser}>
                Submit
              </Button>
            </div>
            <div className="login">
              <Link to="/dev-login">
                <Typography variant="caption" gutterBottom align="center">
                  already have an account? Login here!
                </Typography>
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
