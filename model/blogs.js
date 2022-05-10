import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
     title: {
          type: String,
          lowercase:true,
          required: [true, "Blog title is required."],
          trim: true,
          maxlength: [100, "Blog title is too long."],
     },
     summary:{
          type:String,
          trim:true,
          maxlength: [5000, "Blog summary is too long."],
          required: [true, "Blog summary body is required."],
     },
     body: {
          type: String,
          trim: true,
          maxlength: [5000, "Blog is too long."],
          required: [true, "Blog body is required."],
     },
     likes: {
         default:[],
          type: Array,
          trim:true,
     },
     comments: {
        default:[],
          type: Array,
          trim: true,
     },
     tags: {
        default:[],
          type: Array,
          trim: true,
     },
     author: {
         required:[true, "Author id is required."],
          type: mongoose.SchemaTypes.ObjectId,
          ref:"User"
     },
     createdOn: {
          type: String,
          default: new Date().toString(),
     },
     status:{
          type:String,
          default:"public",
     },
     draft:{
          type:String,
          default:false,

     }
});


// blogSchema.pre("save", async function (next) {
//      if (!this.isModified("password")) return next();
//      this.password = await hash(this.password, 10);
//      next();
// });

export const Blog = mongoose.model("Blog", blogSchema);