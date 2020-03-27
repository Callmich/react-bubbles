import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [cred, setCred] = useState({
    credentials: {
      username: '',
      password: ''
    }
  })

  const handleChange = e => {
    setCred({
      credentials: {
        ...cred.credentials,
        [e.target.name]: e.target.value
      }
    })
    console.log(cred)
  }

  const submitLogin = (e) => {
    e.preventDefault();
    console.log("what I'm passing",cred.credentials)
    axiosWithAuth()
    .post('/api/login', cred.credentails)
    .then(res => {
      console.log("Login Response", res)
      (localStorage.setItem('token', JSON.stringify(res.data.payload)))
      props.history.push('/colors')
    })
    .catch(err => {
      console.log("Login Error", err.response)
    })
  }
  //looking at the server I think I need to make this an async call.

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <br/>
      <form onSubmit={submitLogin}>
        <label>Name: 
          <input 
            type="text"
            name="username"
            id="username"
            value={cred.credentials.username}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>Password:
          <input
            type="password"
            name="password"
            id="password"
            value={cred.credentials.password}
            onChange={handleChange}
          />
        </label>
        <br/>
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
