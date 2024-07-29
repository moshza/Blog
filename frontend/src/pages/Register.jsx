import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import blog from '../images/blog.png'

const Register = () => {
  const [inputs,setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [file,setfile] = useState(null);
  const [error,setError] = useState(null);

  const navigate = useNavigate(); 

  const handleChange = e =>{
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8880/uploads", formData, { withCredentials: true });
      return res.data;
    }catch(e) {
      console.log(e)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const imgUrl = await upload();

    try{
      await axios.post("http://localhost:8880/auth/register",{...inputs,img:file ? imgUrl : ""}, { withCredentials:true });
      navigate("/login");
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
        <h1>Register</h1>
        <form >
            <input type="text" name='username' placeholder='username' required onChange={handleChange}/>
            <input type="email" name='email' placeholder='email' required onChange={handleChange}/>
            <input type="password" name='password' placeholder='password' required onChange={handleChange}/>
            <input style={{display: "none"}} type="file" id="file" onChange={e => setfile(e.target.files[0])}/>
            <label className="file" htmlFor="file">Upload Image</label>
            <button onClick={handleSubmit}>Register</button>
           {error && <p>{error}</p>}
            <span>
                Do you have an account? <Link to="/login">Login</Link>
            </span>
        </form>
    </div>
  )
}

export default Register