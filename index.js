
require('dotenv').config()
const jwt=require('jsonwebtoken')
const express = require('express')
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserModel')
const { UserRouter } = require('./routes/UserRoutes')
const { auth } = require('./middleware/Authentication')
const { PostRouter } = require('./routes/PostRoutes')
const app = express()
app.use(express.json())
app.use(cors())
// app.use("/users",auth())
app.use("/users",UserRouter)
app.use("/posts",auth)
app.use("/posts",PostRouter)
app.get("/", async (req, res) => {
    res.send('hi welcome to 86 agency')
})



app.get("/analytics/users",async(req,res)=>{
        try{
      let allData=await UserModel.find()
      res.send(allData)
        }catch(err){
            res.send({"msg":"somthing went wrong! cannot Get userData","error":err.message}) 
        }
    })


  app.get("/analytics/posts",async(req,res)=>{
        try{
            let allData=await PostModel.find()
            res.send(allData)
        }catch(err){
    
        }
    })


app.post("/login",async(req,res)=>{
let data=req.body

try{
     let userData=await UserModel.find({email:data.email})
     console.log(userData)
     if(userData.length>0){
        
        var token = jwt.sign({ user_id:userData[0]._id }, 'jitendra');
        res.send({"msg":"Login Successfull","token":token})
     } 
}catch(err){
    res.send({"msg":"somthing went wrong! ","error":err.message}) 
}


})

// app.post("/users",async(req,res)=>{
//     try{

//     }catch(err){
        
//     }
// })

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`connected to db`)
    } catch (err) {
        console.log(`unable to connect to db`)
    }

    console.log(`server running on port ${process.env.port}`)
})



