import express from "express";
import { client } from "../mongodb.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"




const authRouter = express.Router();
const app = express();

const db = client.db("crud"); // Database
const col = db.collection("users"); // Collection



// Signup Api

authRouter.post("/signup",async(req,res)=>{

    const saltRounds = 10; 
    
    if(!req.body?.firstName ||
        !req.body?.lastName||
        !req.body?.email.toLowerCase()||
        !req.body?.password
    ){
        res.status(403).send("Please fill All Field")
    }
    try {
        const findEmail =await col.findOne({email:req.body.email.toLowerCase()})

        if(!findEmail){

            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const insertResponse =await col.insertOne({
                firstName:req.body.firstName,
                lastname:req.body.lastName,
                email:req.body.email.toLowerCase(),
                password:hashedPassword,
                createdAt: new Date()
            });
            console.log("insertResponse",insertResponse)
            res.status(200).send({
                message:"Signup SuccessFull",

            })
        }
        else{
            res.status(403).send("This Email is Exists")
        }
        

    } catch (error) {
        console.log("error",error)
        res.status(500).send("")
        
    }
})

//Login Api

authRouter.post("/login",async(req,res)=>{
    if(
        !req.body.email.toLowerCase()||
        !req.body.password
    ){
        res.status(403).send("All Field Are Required")
    }
    try {
        const findEmail =await col.findOne({email:req.body.email.toLowerCase()})
        console.log("findEmail",findEmail)

        if(!findEmail){
            res.status(401).send({
                message:"Email or Password Incorrect"
            });
            return
        }
        else{

            const isMatch = await bcrypt.compare(req.body.password, findEmail.password);


            if(isMatch){

                //TODO:Create token for This user

                const token = jwt.sign({
                    isAdmin:false,
                    email:req.body.email,
                    createdOn:new Date().getTime(),
                },process.env.SECRET)

                res.cookie("token",token,{
                    httpOnly:true,
                    secure:true
                })

                res.status(200).send({
                    message:"Login SuccessFull"
                });
                return
            }
            else{
                res.status({
                    message:"Email or Password Incorrect"
                });
                return
            }
        }
        

    } catch (error) {
        console.log("error",error)
        res.status(500).send("")
        
    }
   
})

export default authRouter