const jwt = require("jsonwebtoken");

//...........................................................//

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token)
            token = req.headers["x-Api-Key"];
        if (!token)
            return res.status(401).send({ status: false, msg: "Token must be present" });
        else
            next()
    } catch {
        res.status(500).send({ status: false, msg: "Server Error ❌" });
    }
}

const authorise = function (req, res, next) {
    try {
        let paramsId = req.query.authorId || req.params.authorId;
        let decodedToken = jwt.verify(req.headers["x-api-key"] || req.headers["x-api-key"], "functionup-Project-1");
        let authorLoggedIn = decodedToken.authorId
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "token is invalid" });
        else if (paramsId !== authorLoggedIn)
            res.status(403).send({ status: false, msg: 'You are not allowed to modify the requested user\'s data' })
        else
            next()
    } catch {
        res.status(500).send({ status: false, msg: "Server Error ❌" });
    }
}


module.exports = { authenticate, authorise }

