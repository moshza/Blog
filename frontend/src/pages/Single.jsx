import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import post from '../images/post.png'
import user from '../images/user.png'
import edit from '../images/edit.png'
import deletePost from '../images/delete-post.png';
import axios from 'axios'
import moment from 'moment'

const Single = () => {
  const [post,setPost] = useState({});

  const navigate = useNavigate();

  const location = useLocation();
  
  //extracting the post id from the path
  const postId = location.pathname.split("/")[2];

  const {currentUser} = useContext(AuthContext);
  

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8880/posts/${postId}`);
        setPost(res.data);
      } catch(e) {
        console.log(e);
      }
    };

    fetchData();
  },[postId]);

  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:8880/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch(e) {
      console.log(e);
    }
  }

  const getTxt = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  }

  return (
    <div className='single-post'>
      <div className="content">
        <img src={`../uploads/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className='info'>
            <span>{post && post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
         {currentUser.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
             <img title='edit' src={edit} alt="" />
            </Link>
            <img onClick={handleDelete} title='delete' src={deletePost} alt="" />
          </div>}
        </div>
        <h1>{post.title}</h1>
          {getTxt(post.desc)}
      </div>
      <Menu category={post.category}/>
    </div>
  )
}

export default Single