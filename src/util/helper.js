let date = new Date();
let day = date.getDate();
let month = date.getMonth()+1;

const printdate = function() {
    console.log("day =" + day);
}
const printMonth = function(){
    console.log("month ="+ month);
}
const getBatchInfo = function() {
console.log("Radon, w3, d3, the topic for today is Nodejs Module system")
}

module.exports.getBatchInfo = getBatchInfo
module.exports.printMonth = printMonth
module.exports.printdate = printdate



