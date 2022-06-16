const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//#1
const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = req.body;
  let savedData = await userModel.create(data);
  // console.log(abcd.newAtribute);
  res.send({ msg: savedData });
};

//#2
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};


//#3
const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

//#4
const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, {new: true});
  res.send({ status: "User updated", data: updatedUser });
};

//#5
const del = async function (req, res) {
  let userId=req.params.userId;
    let user =await userModel.findById(userId)
    console.log(user)
     if (!user) {
      return res.send("No such user exists");
    }
  let data = await userModel.findOneAndUpdate({_id:userId},
    {isDeleted : true} , 
    { new: true})
    res.send({ status: true, msg: data })
}

//#6
const postMessage = async function (req, res) {
  let message = req.body.message
  let userToBeModified = req.params.userId
  let user = await userModel.findById(userToBeModified)
  if(!user) return res.send({status: false, msg: 'No such user exists'})
  let updatedPosts = []
  //add the message to user's posts
  updatedPosts.push(message)
  let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})
  //return the updated user document
  return res.send({status: true, data: updatedUser})
}



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.del = del
module.exports.postMessage = postMessage