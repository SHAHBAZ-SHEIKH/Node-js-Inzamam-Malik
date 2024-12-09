import express from "express";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());


const PORT = process.env.PORT || 3000;






app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});