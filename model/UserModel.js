const mongoose=require(`mongoose`)


const UserSchema=mongoose.Schema({
    name:{ type: String, minlength: 1, maxlength: 50,required: true },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(value) {
     return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
          },
          message: 'Please enter a valid email address',
        },
      },
    bio:{ type: String, minlength: 0, maxlength: 200}

},{
    versionKey:false,
    timestamps:true
})





const UserModel=mongoose.model("user",UserSchema)


module.exports={
    UserModel
}