import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './login.css';

const Login = () => {
  const navigate = useNavigate() 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://atara-backend.onrender.com/user/login', {
        email,
        password
      });
                  toast.success('Login successful!', {
              position: toast.POSITION.TOP_RIGHT,
            });
            
      navigate('/');
      // Handle successful login response
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error('Invalid email or password!', {
                   position: toast.POSITION.TOP_RIGHT,
                     });
    }
  };
  const handleSwitchToAdmin = () => {
    navigate('/loginAdmin');
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://atara-backend.onrender.com/user/', {
        first_name,
        email,
        password,
        phone
      });
      toast.success('Signup done!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      // Handle successful signup response
      console.log(response.data);
    } catch (error) {
      // Handle error 
      console.error(error);
      toast.error('Email already exist!!', {
        position: toast.POSITION.TOP_RIGHT,
          });
      
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className='body'>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="first_name" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)} />
            <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="pswd" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
            <input type="number" name="phone" placeholder="Phone" required onChange={(e) => setPhone(e.target.value)} />
            <button className="login-form-btn">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true" className='login-label'>Login</label>
            <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="pswd" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
            <button className="login-form-btn">Login</button>
            <button className="login-form-btn" onClick={handleSwitchToAdmin}>
                Switch to admin login
              </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;


