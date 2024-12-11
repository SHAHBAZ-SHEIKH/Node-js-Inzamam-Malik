import express from "express";
import cors from "cors";
import path, { format } from "path";
import authRouter from "./routes/authRoute.js";
import commentRouter from "./routes/commentRoute.js";
import postRouter from "./routes/postRoute.js";
import "dotenv/config"

import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"



const __dirname = path.resolve();





const app = express();


app.use(express.json());//bodyParser
app.use(cookieParser())

app.use(cors());


const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRouter);

app.use(express.static(path.join(__dirname, 'public')))



app.use((req, res, next) => {
    //const token = "valid";

    
    const token = req.cookies.token
    

    try {
        const decoded = jwt.verify(token, process.env.SECRET)

        console.log("decoded", decoded)

        // const now = new Date().getTime()

        // console.log("now",now)
        // console.log("decoded.expires",decoded.expires)

            req.body.decoded = {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
                isAdmin: decoded.isAdmin

            }
            next();
        

    } catch (error) {
        res.status(401).send("Invalid Token")

    }

})

app.use("/api/v1", commentRouter);
app.use("/api/v1", postRouter);









app.listen(PORT, () => {

    console.log("Server is running on port 3000");
});
