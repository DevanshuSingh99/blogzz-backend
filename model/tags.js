import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
     name: {
          type: String,
          lowercase:true,
          required: [true, "Name is required."],
          trim: true,
          minlength: [2, "Name is too short."],
          maxlength: [20, "Name is too long."],
         
     },
});


export const Tag = mongoose.model("Tag", tagSchema);