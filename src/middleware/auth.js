const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    //check the token in request header
    //validate this token
    try {
        let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
        let decodedToken = jwt.verify(token, "functionup-radon");
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "token is invalid" });
        req["decodedToken"] = decodedToken
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
    next()
}


const authorise = function (req, res, next) {
    // comapre the logged in user's id and the id in request
    try {
        let decodedToken = req.decodedToken
        let userToBeModified = req.params.userId
        let userLoggedIn = decodedToken.userId
        if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
    next()
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise
