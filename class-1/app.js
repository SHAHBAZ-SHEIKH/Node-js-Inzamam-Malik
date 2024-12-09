import express from "express";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());


const PORT = process.env.PORT || 3000;




app.get("/weather/:city", (req, res) => {
    let weatherData = {
        karachi:{
            city:"karachi",
            temp:30
        },
        lahore:{
            city:"lahore",
            temp:40
        },
        islamabad:{
            city:"islamabad",
            temp:50
        }
    }

    let city = req.params.city.toLowerCase();
    const citiesData = weatherData[city];
    if(citiesData){
        res.send(citiesData);
    }
    else{
        res.status(404).send( `City not found ${req.params.city}`);
    }
    
})

const comments = [];


app.post("/comments/:name", (req, res) => {
    const name = req.params.name;
    const comment = req.body.comment;

    comments.push({
        name,
        comment
    })
    console.log(req.body);
    res.send("Data Received");
})


app.get("/comments", (req, res) => {
    res.send(comments);
})


app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});