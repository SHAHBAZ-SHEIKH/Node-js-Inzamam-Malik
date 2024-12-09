import express, { text } from "express";
import { nanoid } from "nanoid";
const postRouter = express.Router();
const app = express();



let posts = [
    {
        id: nanoid(),
        title: "post 1",
        text: "post 1 text"

    }
]

postRouter.post("/post", (req, res) => {
    if (!req.body.title || !req.body.text) {
        return res.status(400).send("required fields missing")
    }
    posts.push({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    })
    res.send("Post Created");

})

postRouter.get("/posts", (req, res) => {
    res.send(posts);
});

// postRouter.get("/posts/:postId",(req,res)=>{

//     if(isNaN(req.params.postId)){
//         res.status(403).send(`post id is a valid number not a alphabetic character`)
//         return
//     }

//     for(var i=0; i<posts.length; i++){
//         if(posts[i].id == req.params.postId){
//             res.send(posts[i])
//             return
//         }
//     }
//     res.send("post not Found with id"+req.params.postId)

// })



postRouter.put("/posts/:postId", (req, res) => {


    if (!req.params.postId || !req.body.title || !req.body.text) {
        res.status(403).send(`post id is required `)
        return
    }

    // for (var i = 0; i < posts.length; i++) {
    //     if (posts[i].id == req.params.postId) {
    //         posts[i] = {
    //             title: req.body.title,
    //             text: req.body.text
    //         }
    //         res.send("Post updated with id" + req.params.postId)
    //         return
    //     }
    // }

    //res.send("Post not found")

    posts = posts.map((post)=>{
        if(post.id == req.params.postId){
            post.title = req.body.title
            post.text = req.body.text
        }
        
        return post
    })

    

    res.send("Post updated with id" + req.params.postId)

})



postRouter.delete("/posts/:postId", (req, res) => {
    if (!req.params.postId) {
        res.status(403).send(`post id is required `)
        return
    }

    posts = posts.filter((post) => post.id !== req.params.postId)

    res.send(posts);

    // for(var i=0; i<posts.length; i++){
    //     if(posts[i].id == req.params.postId){
    //         posts.splice(i,1)
    //         res.send("Post deleted with id" +req.params.postId)
    //         return
    //     }
    // }

    //res.send("Post not found")

})


export default postRouter