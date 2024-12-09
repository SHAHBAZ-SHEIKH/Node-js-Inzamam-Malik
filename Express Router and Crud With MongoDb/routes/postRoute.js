import express from "express";
import { nanoid } from "nanoid";
import { client } from "../mongodb.js"; // MongoDB client from mongodb.js

const db = client.db("crud"); // Database
const col = db.collection("posts"); // Collection
const postRouter = express.Router();

// Middleware to parse JSON request body
postRouter.use(express.json()); 

// POST route to create a new post
postRouter.post("/post", async (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).send("Required fields missing");
    }

    const newPost = {
        id: nanoid(),
        title,
        text
    };

    try {
        const result = await col.insertOne(newPost);
        console.log("Post created:", result);
        res.status(201).send("Post created");
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).send("Server Error");
    }
});

// GET route to fetch all posts
postRouter.get("/posts", async (req, res) => {
    try {
        const getAllPosts = col.find({})
        const results = await getAllPosts.toArray()
        console.log("results",results)
        res.status(200).send(results)
    } catch (error) {
        console.log("error",error)
        res.status(500).send("Server Error")
        
    }
});

// PUT route to update a post
postRouter.put("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).send("Title and text are required");
    }

    try {
        const result = await col.updateOne(
            { id: postId },
            { $set: { title, text } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send(`Post with ID ${postId} not found`);
        }

        res.send(`Post updated with ID ${postId}`);
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Error updating post");
    }
});

// DELETE route to delete a post
postRouter.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const result = await col.deleteOne({ id: postId });

        if (result.deletedCount === 0) {
            return res.status(404).send(`Post with ID ${postId} not found`);
        }

        res.send(`Post deleted with ID ${postId}`);
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).send("Error deleting post");
    }
});

export default postRouter;
