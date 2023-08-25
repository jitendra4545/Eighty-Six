
require('dotenv').config()
const express = require('express')
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserModel')
const { UserRouter } = require('./routes/UserRoutes')
const app = express()
app.use(express.json())
app.use("/users",UserRouter)

app.get("/", async (req, res) => {
    res.send('hi welcome to 86 agency')
})



app.get("/analytics/users",async(req,res)=>{
        try{
      let allData=await UserModel.find()
      res.send(allData)
        }catch(err){
          res.send(err)  
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



