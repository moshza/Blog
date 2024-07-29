import { db } from "../db.js";
import jwt from "jsonwebtoken"

export const getAllPosts = (req,res) => {
   const q = req.query.cat ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";

   db.query(q, [req.query.cat], (err,data) => {
    if(err) return res.json(err);

    return res.status(200).json(data);
   })
};

export const getPost = (req,res) => {
   const q = "SELECT p.id, `username`, `title`, `desc`,u.img AS userImg, p.img, `category`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";

   db.query(q,[req.params.id], (err,data) => {
    if(err) return res.json(err);

    return res.status(200).json(data[0]);
   })
};

export const addPost = (req,res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!");

         const q = "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`, `uid`) VALUES (?)";

         const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
         ];
         
         db.query(q,[values], (err, data) => {
            if(err){
                console.log(err)
                return res.json(err);
            } 
            return res.status(200).json("Post has been created.");
         });
    });
};

export const deletePost = (req,res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(q,[postId, userInfo.id], (err,data) => {
            if(err) return res.json("You can delete your posts only!");
            
            return res.json("Post has been deleted successfully!");
        })
    })
};

export const updatePost = (req,res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!");

         const postId = req.params.id;
         const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `category`=? WHERE `id` = ? AND `uid` = ?";

         const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
         ];

         db.query(q,[...values, postId, userInfo.id], (err, data) => {
            if(err){
                console.log(err)
                return res.json(err);
            } 
            return res.status(200).json("Post has been edited.");
         });
    });
};