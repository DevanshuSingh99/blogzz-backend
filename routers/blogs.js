import express from "express";
import {accessToken} from './accessToken.js'
const router = express.Router();

import { getBlogs,createBlogs,getBlog,getMyBlogs} from "../controller/blogs.js";

// Get blogs 
// If not logged in return latest/top blogs/on based of tags
// if logged in return latest blogs of followed members
router.get("/", getBlogs);  

//Get User blogs including drafts and all of his blogs.
router.get("/getUserBlogs",accessToken,getMyBlogs)

//Post blogs
router.post("/",accessToken, createBlogs);
router.get("/:title",accessToken, getBlog);  

//delete blogs
//setting blog to not visible

//update blogs

// router.post("/", createUser);
// router.delete("/", deleteUser);
// router.patch("/", updateUser);

export default router;
