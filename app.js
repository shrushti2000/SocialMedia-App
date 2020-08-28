const express=require("express");
const app=express();
const mongoose=require('mongoose')
const morgan=require('morgan');

const bodyParser=require("body-parser");
var cookieParser=require('cookie-parser');
const expressValidator=require("express-validator");
const dotenv=require('dotenv');

dotenv.config()

//bring in routes
const postRouters=require('./routes/post');
const authRouters=require('./routes/auth');
const userRouters=require("./routes/user");

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

//mongoose.connection.on('error',err=>{
  //  console.log(`DB Connection error:${err.message}`);
//});




//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/",postRouters);
app.use("/",authRouters);
app.use("/",userRouters);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"Unauthorized"});
  }
});



const port=process.env.PORT || 8000;
app.listen(port,()=>{console.log(`A Node Js API ${port}`)});