import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Menu = ({category}) => {

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8880/posts/?cat=${category}`);
        setPosts(res.data);
      } catch(e) {
        console.log(e);
      }
    };

    fetchData();
  },[category])

    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet",
    //       desc: "Lorem ipsum dolor sit amet",
    //       img: blog
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet",
    //       desc: "Lorem ipsum dolor sit amet",
    //       img: blog
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit amet",
    //       desc: "Lorem ipsum dolor sit amet",
    //       img: blog
    //     }
    //   ]
  return (
    <div className='menu'>
        <h1>Other posts you may be interested in</h1>
        {posts.map(post => (
          <div className="post" key={post.id}>
            <img src={`../uploads/${post?.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>  
        ))}
    </div>
  )
}

export default Menu