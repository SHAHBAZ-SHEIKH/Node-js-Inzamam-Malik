import express from "express";
const authRouter = express.Router();
const app = express();

authRouter.post("/signup",(req,res)=>{
    res.send("signup")
})

authRouter.post("/login",(req,res)=>{
    console.log("login")
    res.send("login")
})

export default authRouter