import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import multer from "multer"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"

const app = express();
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname)
    }
  })

// const storageForUserImg = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../frontend/public/userImgUploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null,Date.now() + file.originalname)
//     }
//   })  

const upload = multer({ storage });
// const uploadUserImg = multer({ storageForUserImg });

app.post('/upload', upload.single('file'), function (req, res) {
    const file = req.file || "";
    res.status(200).json(file.filename);
  });
  
// app.post('/uploads', uploadUserImg.single('file'), function (req, res) {
//     const file = req.file || "";
//     res.status(200).json(file.filename);
//   });


  
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/posts",postRoutes)

app.listen("8880",() => {
    console.log("Server is on");
})