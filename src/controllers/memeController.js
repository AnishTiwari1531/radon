let axios = require("axios")


let memeID = async function (req, res) {
    try {
        let template_id = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.body
        let password = req.body
    
        console.log(`query params are: ${template_id} ${text0} ${text1}`)
        var data = {
            method :"post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`,
            data : (username, password)
        }
        let result = await axios(data)
        // console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.memeID = memeID