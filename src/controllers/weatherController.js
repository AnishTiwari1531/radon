let axios = require("axios")


let londonWeather = async function (req, res) {
    try {
        let city = req.query.q
        let Appid = req.query.Appid

        console.log(`query params are: ${city} ${Appid}`)

        var options = {
            method: "get",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=London&Appid=6d1575c41c81d2e7eee721eb9a83c927'
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let CheckTemp = async function (req, res) {
    try {
        let city = req.query.q
        let Appid = req.query.Appid
        console.log(`query params are: ${city} ${Appid}`)


        var options = {
            method: "get",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=London&Appid=6d1575c41c81d2e7eee721eb9a83c927'
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ city: city, temp: result.data.main.temp })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let CheckWeather = async function (req, res) {
    try {
        let citiesArray = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let CitiesObj = []
        for (let i = 0; i < citiesArray.length; i++) {
            let Obj = { city: citiesArray[i] }
            var options = {
                method: "get",
                url: (`http://api.openweathermap.org/data/2.5/weather?q=${citiesArray[i]}&Appid=6d1575c41c81d2e7eee721eb9a83c927`),
            }
            let final = await axios(options)
            Obj.temp = final.data.main.temp
            CitiesObj.push(Obj)
        }
        var shortt = CitiesObj.sort(function (a, b) { return a.temp - b.temp })
        res.status(200).send({ status: true, data: shortt })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.londonWeather = londonWeather
module.exports.CheckTemp = CheckTemp
module.exports.CheckWeather = CheckWeather
