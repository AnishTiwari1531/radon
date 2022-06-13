const mongoose = require("mongoose")
const product = require("../models/product")
const order = require("../models/order")
const userdocument = require("../models/user")
const product1 = require("../models/product")

//#1
const createProDoc= async function (req, res) {
    let data = req.body
    let ProDocCreated = await product1.create(data)
    res.send({data: ProDocCreated})
}

//#2
const createUserDoc = async function (req, res) {
    let data = req.body
    let UserDocCreated = await userdocument.create(data)
    res.send({data : UserDocCreated})
}

//#3
// const verify=function(ObjectId){
//     return mongoose.Types.ObjectId.isValid(ObjectId)
// }
// const createOrder = async function(req, res){
//     let data = req.data
//     let user=await userdocument.findById(data.userId) 
//     let product1 =await product.findById(data.productId)
//     console.log(user)
//     console.log(product1)
//     const verify=function(ObjectId){
//         return mongoose.Types.ObjectId.isValid(ObjectId)
//     }
//     if(!verify(data.userId)){
//         return res.send("your author Object Id is not valid")
//     }
//     if (!user){
//         return res.send({msg:"User ID is not Present in DB"})
//      }
 
//     if(!verify(data.productId)){
//         return res.send("your author Object Id is not valid")
//     }
//     if (!product){
//         return res.send({msg:"Product Id is not Present in DB"})
//     }

//     let orderCreated = await order.create(data)
//     res.send({data: orderCreated})
// }

const createOrder=async function(req,res){
    let data = req.body 
    
    let user=await userdocument.findById(data.userId) 
    let product =await product1.findById(data.productId)
    
    console.log(user)
    console.log(product)


    if (!mongoose.Types.ObjectId.isValid(data.userId)){
        return res.send({msg:"plz provide Valid UserId"})
    }
    
    if (!user){
       return res.send({msg:"User ID is not Present in DB"})
    }


    if (!mongoose.Types.ObjectId.isValid(data.productId)){
        return res.send({msg:"plz provide Valid UserId"})
    }
   
    if (!product){
        return res.send({msg:"Product Id is not Present in DB"})
    }

    
   
    if(user.isFreeAppUser){
    data.amount=0
    data.isFreeAppUser=true
    const orderCreated = await order.create(data)
    return res.send({msg: orderCreated})              
    }

    
    if(user.balance>=product.price){
        data.amount=product.price
        data.isFreeAppUser=false
    const orderCreated = await order.create(data)
    let updatedPrice=user.balance-product.price
    await userdocument.findByIdAndUpdate(data.userId,{balance:updatedPrice})
    return res.send({msg: orderCreated})
    }
    
   res.send({msg:"Low Balance"})
    
    

}

module.exports.createProDoc = createProDoc
module.exports.createUserDoc = createUserDoc
module.exports.createOrder = createOrder

