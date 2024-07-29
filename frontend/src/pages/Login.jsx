import React, { useContext } from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import blog from '../images/blog.png'

const Login = () => {
  const [inputs,setInputs] = useState({
    username: "",
    password: ""
  });

  const [error,setError] = useState(null);

  const navigate = useNavigate(); 

  const {login} = useContext(AuthContext);

  const handleChange = e =>{
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/");
    }
    catch(e){
     setError(e.response.data);
    }
  }
  return (
    <div className='auth'>
      <div className='logo'>
        <img src={blog} alt="" />
      </div>
        <h1>Login</h1>
        <form >
            <input type="text" name='username' placeholder='username' onChange={handleChange}/>
            <input type="password" name='password' placeholder='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            {error && <p>{error}</p>}
            <span>
                Don't have an account? <Link to="/register">Register</Link>
            </span>
        </form>
    </div>
  )
}

export default Login