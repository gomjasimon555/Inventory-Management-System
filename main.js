const express = require("express")
const cors=require('cors')

const itemRouter = require("./routes/inventory")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const connectDatabase = require("./database/connection");
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());


app.use(cors())
require('dotenv').config();

connectDatabase();

app.use(cookieParser())
app.use("/api/items",itemRouter);
app.use("/api/userAuth",authRouter);
app.use("/api/userRoute",userRouter);

app.get("*",(req,res)=>{
    res.send("<h1> Provided Index not found </h1>")
})

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running on port ${process.env.PORT}`);
})


