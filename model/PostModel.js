
const mongoose = require('mongoose')



const PostSchema = mongoose.Schema({
    user_id:String,
    content: { type: String, minlength: 1, maxlength: 300,required: true },
    likes: {type:Number,required:true}
}, {
    versionKey: false,
    timestamps: true
})



const PostModel = mongoose.model("post", PostSchema)



module.exports = {
    PostModel
}