import express from "express";
const commentRouter = express.Router();
const app = express();

commentRouter.get("/comments", (req, res) => {
    res.send("comments");
});

commentRouter.post("/comments/:userId/:postId", (req, res) => {
    res.send("create comment");
    
})

commentRouter.put("/comments/:commentId", (req, res) => {
    res.send("update comment");
})

commentRouter.delete("/comments/:postId/:commentId", (req, res) => {
    res.send("delete comment");
})


export default commentRouter