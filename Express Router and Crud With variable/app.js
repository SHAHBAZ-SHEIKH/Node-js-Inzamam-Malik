import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./routes/authRoute.js";
import commentRouter from "./routes/commentRoute.js";
import postRouter from "./routes/postRoute.js";

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());


const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRouter);

app.get((req, res,next) => {
    const token = "valid";
    if(token=="valid"){
        next()
    }
    else{
        res.status(401).send("Unauthorized")
    }

    
})

app.use("/api/v1", commentRouter);
app.use("/api/v1", postRouter);






app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});