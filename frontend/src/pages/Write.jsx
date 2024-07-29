import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  
  const state = useLocation().state;

  const [value,setValue] = useState(state?.desc || "");
  const [title,setTitle] = useState(state?.title || "");
  const [cat,setCat] = useState(state?.category || "");
  const [file,setfile] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8880/upload", formData, { withCredentials: true });
      return res.data;
    }catch(e) {
      console.log(e)
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try{
      state ? await axios.put(`http://localhost:8880/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : ""
      }, { withCredentials: true }) : await axios.post(`http://localhost:8880/posts/`, {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }, { withCredentials: true });
      console.log(value)
      navigate("/");
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div className='add-post'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)}/>
        <div className="text-container">
          <ReactQuill value={value} onChange={setValue} className="editor" theme='snow'/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display: "none"}} type="file" id="file" onChange={e => setfile(e.target.files[0])}/>
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save to drafts</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write