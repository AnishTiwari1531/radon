const authorModel = require("../models/authorModel")

//------------------------regex---------------------------//

let emailRegex= /^[A-Za-z]{1}[A-Za-z0-9]{1,100}[@]{1}[A-Za-z0-9]{2,15}[.]{1}[A-Za-z0-9]{2,10}$/

let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/


//---------------------------------------------------------------//

const createAuthor = async function (req, res) {
   try{
    let data = req.body
    let {fname,lname,title,password,email}=data
    if(Object.keys(data).length===0){
        return res.status(400).send({Status:false, message:"Please provide the data"})
    }
    if(!fname || fname==""){
        return res.status(400).send({Status:false, message:"Please provide fname"})
    }
    if(!lname || lname==""){
        return res.status(400).send({Status:false, message:"Please provide lname"})
    }
    if(!title || title==""){
        return res.status(400).send({Status:false, message:"Please provide title"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).send({Status:false, message:"Please enter valid email"}) 
    }
    if(email){
        let checkemail= await authorModel.findOne({email:email})
     
        if(checkemail){
            return res.status(400).send({Status:false, message:"Please provide another email, this email has been used"})
        }
    }
    if(!passwordRegex.test(password)){
        return res.status(400).send({Status:false, message:"Please provide valid password"})
    }
    
    let savedData = await authorModel.create(data)
    return res.status(201).send({ msg: savedData })
   }
   catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Server Error", error: err.message })
  }
}
module.exports.createAuthor = createAuthor