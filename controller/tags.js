import mongoose from "mongoose";
import {} from "dotenv/config";
import {Tag} from "../model/tags.js";


export const getTags = async (req,res)=>{
    try {
        const tags = await Tag.find();
        return res.json(tags);
    } catch (error) {
     return res.status(500).send(error.message);

    }
}