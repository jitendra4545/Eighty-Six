const express=require('express')
 const { auth } = require('../middleware/Authentication')
const { PostModel } = require('../model/PostModel')

const PostRouter=express.Router()



PostRouter.post("/",auth,async(req,res)=>{
    let data=req.body
    // console.log(req.body)
 console.log(data)

try{
    let newData=await PostModel(data)
    await newData.save()
    res.send({"msg":"Post have been added successfully"})
}catch(err){
console.log(err)
}


})


PostRouter.get("/:id", async (req, res) => {
    let id = req.params.id

    console.log(id)
    try {
        let SingleData = await PostModel.find({ _id: id })
        res.send(SingleData)
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})

PostRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let data = req.body
    // console.log(id, data)
    try {
        let updateData = await PostModel.updateOne({ _id: id }, data)
        res.send({"msg":"Post data have been updated successfully"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})

PostRouter.delete("/:id", async (req, res) => {
    let id = req.params.id

    console.log(id)
    try {
        let deleteData = await PostModel.deleteOne({ _id: id })
        res.send({"msg":"Post have been deleted successfully"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})


PostRouter.post("/:id/like",async(req,res)=>{
    let id=req.params.id
    console.log(id)
    try{
      let newData=await PostModel.findById({_id:id})
      newData.likes+=1
      await newData.save()
      res.send({"msg":"Post have been liked successfully"})
    }catch(err){

    }
})


PostRouter.post("/:id/unlike",async(req,res)=>{
    try{}catch(err){
        
    }
})

module.exports={
    PostRouter
}
