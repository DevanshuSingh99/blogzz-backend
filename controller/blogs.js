import mongoose from "mongoose";
import {} from "dotenv/config";
import {Blog} from "../model/blogs.js";
import {Tag} from "../model/tags.js";

export const getBlogs = async (req, res) => {
    // Category wise , tags wise, search ,
    //Additional filter > top post, most liked , most viewed
    // If we get single blog id , return the blog
    const filters = {};
    try {
        const blogs = await Blog.find().populate("author");
        return res.json(blogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
export const getBlog = async (req, res) => {
    const {title} = req.params;
    // Category wise , tags wise, search ,
    //Additional filter > top post, most liked , most viewed
    // If we get single blog id , return the blog
    const filters = {};
    try {
        const blogs = await Blog.findOne({title}).populate("author");
        return res.json(blogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const getMyBlogs = async (req, res) => {
    // Getting all user blogs > Drafts,posted,hidden
    try {
        const blogs = await Blog.find({author: req.user.id});
        return res.json(blogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

//travel //food // coding

export const createBlogs = async (req, res) => {
    const {title, body, tags, summary, newTags} = req.body;
    // Plagrism check
    if (!(newTags.length === 0)) {
        try {
            let newTagsresponse = await Tag.insertMany(newTags);
            newTagsresponse.forEach((item) => {
                tags.push(item.name);
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    try {
        let ifBlogExists = await Blog.find({title, author: req.user.id});
        if (ifBlogExists.length) {
            return res.status(200).json({
                message: "You have already created a blog with this title.",
            });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }

    try {
        let responseBlog = await Blog.create({
            title,
            summary,
            body,
            tags,
            author: req.user.id,
        });
        return res.status(200).json({responseBlog, message: "Blog created"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
};

const arrayToObject1 = (arr, key) => {
    return arr.reduce((obj, item) => {
        obj[item[key]] = item;
        return obj;
    }, {});
};
