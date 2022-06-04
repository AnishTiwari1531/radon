const express = require('express');
var bodyParser = require('body-parser');
const {default: mongoose } = require("mongoose");
const route = require('./routes/route');
const app = express();

mongoose.connect("mongodb+srv://Anish_Tiwari1531:SINGH1531@cluster0.40jpapr.mongodb.net/Anish1531_DB?retryWrites=true&w=majority", {
    useNewUrlParser : true
})
.then(() => console.log("MongoDb is connected"))
.catch (err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

