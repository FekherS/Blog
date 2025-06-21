//controllers/postsController.js

import Post from "../models/Post.js";

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find({isDeleted: false}).sort({ceatedAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        console.log("Get All Posts error",error);
        res.status(500).json({ message: "Server error" });
    }

}
export async function getOnePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id, isDeleted: false });
        if (!post) {
            return res.status(404).json({ message: "No post found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log("Get One Post error",error);
        res.status(500).json({ message: "Server error" });
    }
}
export async function createPost(req, res) {
    try {    
        const { title, body } = req.body;
        const user = req.userId;
        const newPost = new Post({ title, body, user });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Create Post error",error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id, isDeleted: false });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!post.user.equals(req.userId)) {
            return res.status(401).json({ message: "Not your Post to delete" });
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {isDeleted: true});
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log("Delete Post error",error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updatePost(req, res)  {
    try {
        const post = await Post.findOne({ _id: req.params.id, isDeleted: false });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!post.user.equals(req.userId)) {
            return res.status(401).json({ message: "Not your Post to edit" });
        }
        const { title, body } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, body }, {new: true});
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log("Update Post error",error);
        res.status(500).json({ message: "Server error" });
    }
}