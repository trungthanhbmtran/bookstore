import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Button, 
  Input,
  Label,
  Alert
} from 'reactstrap';
import { AuthContext } from '../contexts/AuthContext';

export default function(props) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errors, setError] = useState({
    email: '',
    password: '',
    err: ''
  })
  const { setToken, setAlertOpen } = useContext(AuthContext);

  const validate = () => {
    let emailError = '';
    let passwordError = '';

    if (!user.email) {
      emailError = 'The email field is required.'
    }
    if (!user.password) {
      passwordError = 'The password field is required.'
    }

    if (emailError || passwordError) {
      setError({
        email: emailError,
        password: passwordError
      })
      return false;
    }
    return true;
  }

  const handleInput = (event) => {
    event.preventDefault();
    setUser({...user, [event.target.name]: event.target.value})
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      axios.post('http://localhost:5000/user/signin', {
              email: user.email,
              password: user.password
            })
           .then(res => {
              localStorage.setItem('token', res.data.token);
              setToken(res.data.token);
           })
           .then(() => {
              props.setModal(true);
              setAlertOpen();
           })
           .catch(err => {
              setError({
                err: err.response.data
              });
           });
    }
  }

  return(
    <div className="AuthForm">
      <div className="header">
        <h1>Welcome Back</h1>
        <p>Login with your email & password</p>
      </div>
      {errors.err && <Alert color="danger">{errors.err}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">EMAIL</Label>
          <Input 
            id="email" 
            type="email" 
            name="email" 
            placeholder="demo@demo.com"
            onChange={handleInput}
          />
          {errors.email && <div className="validation">{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="password">PASSWORD</Label>
          <Input 
            id="password" 
            type="password" 
            name="password" 
            placeholder="demo"
            onChange={handleInput}
          />
          {errors.password && <div className="validation">{errors.password}</div>}
        </FormGroup>
        <Button size="lg" block type="submit">Continue</Button>
      </Form>
      <div className="footer">
        Don't have an account?
        <span onClick={() => props.changeForm('signup')}>Sign Up</span>
      </div>
    </div>
  )
}