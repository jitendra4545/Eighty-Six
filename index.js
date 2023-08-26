
require('dotenv').config()
const jwt=require('jsonwebtoken')
const cors=require('cors')
const express = require('express')
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserModel')
const { UserRouter } = require('./routes/UserRoutes')
// const { auth } = require('./middleware/Authentication')
const { PostRouter } = require('./routes/PostRoutes')
const { PostModel } = require('./model/PostModel')
const app = express()
app.use(express.json())
app.use(cors())
// app.use("/users",auth())
app.use("/users",UserRouter)
// app.use("/posts",auth)
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
            res.send({"msg":"somthing went wrong! cannot Get PostData","error":err.message}) 
        }
    })




app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`connected to db`)
    } catch (err) {
        console.log(`unable to connect to db`)
    }

    console.log(`server running on port ${process.env.port}`)
})



