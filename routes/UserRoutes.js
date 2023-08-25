

const jwt=require('jsonwebtoken')
const express = require(`express`)
const { UserModel } = require("../model/UserModel")

const UserRouter = express.Router()



UserRouter.post("/", async (req, res) => {
    let data = req.body
    console.log(data)
    try {
        let newUser = new UserModel(data)
       
        res.send({"msg":"User have been added successfully"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})



UserRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let data = req.body
    console.log(id, data)
    try {
        let updateData = await UserModel.updateOne({ _id: id }, data)
        res.send({"msg":"User data have been updated successfully"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})



UserRouter.delete("/:id", async (req, res) => {
    let id = req.params.id

    console.log(id)
    try {
        let deleteData = await UserModel.deleteOne({ _id: id })
        res.send({"msg":"User have been deleted successfully"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})


UserRouter.get("/:id", async (req, res) => {
    let id = req.params.id

    console.log(id)
    try {
        let SingleData = await UserModel.find({ _id: id })
        res.send(SingleData)
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot post userData","error":err.message})
    }
})







module.exports = {
    UserRouter
}