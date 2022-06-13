const mid = function (req, res, next){
    let header = req.headers
    let data=header['isfreeappuser']
    console.log(data)
    if(!data){
        res.send({msg : "missing a mandatory header"})
    }else{
        next()
    }
}

module.exports.mid = mid
