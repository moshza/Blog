import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
const Home = () => {
  const [posts,setPosts] = useState([]);

  const category = useLocation().search; 

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8880/posts${category}`);
        setPosts(res.data);
      } catch(e) {
        console.log(e);
      }
    };

    fetchData();
  },[category])

  const getTxt = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent.substring(0, 400).concat("...");
  }

  return (
<div className='home'>
  <div className="posts">
    {Array.isArray(posts) && posts.length > 0 ? (
      posts.map(post => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`../uploads/${post.img}`} alt="" />
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p>{getTxt(post.desc)}</p>
            <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        </div>
      ))
    ) : (
      <h1>No posts available...</h1>
    )}
  </div>
</div>
  )
}

export default Home