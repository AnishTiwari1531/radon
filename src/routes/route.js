const express = require('express');
const abc = require("../logger/logger");
const xyz = require("../util/helper");
const pqr = require("../validator/formatter");
const load = require("lodash")

const router = express.Router();


router.get('/test-me', function (req, res) {
    abc.log()
    xyz.getBatchInfo()
    xyz.printMonth()
    xyz.printdate()
    pqr.AK()
    res.send('My first ever api!')
});


router.get('/hello', function (req, res) {
const arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const newarr = load.chunk(arr, 3);
console.log((newarr));

const oddNumber = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const number = load.tail(oddNumber);
console.log("Answer of problem 4.b ="+ number);


const arr1 = [1, 3, 4, 4, 5, 6];
const arr2 = [2, 3, 2, 3, 7, 8, 9];
const arr3 = [1, 7, 7, 8, 8, 9, 9];
const arr4 = [5, 5, 6, 3, 3, 2, 1];
const arr5 = [2, 3, 4, 2, 5, 6, 1];
const print = load.union(arr1, arr2, arr3, arr4, arr5) 
console.log("Answer of problem 4.c ="+ print);


const pair = [["horror" , "The Shining"],["drama" , "Titanic"],["thriller" , "Shutter Island"],["fantasy" , "Pans Labyrinth"]];
const obj = load.fromPairs(pair);
console.log(obj);


res.send('Node Js Problem 4')
});


router.get('/sol1', function (req, res) {
let arr= [1,2,3,5,6,7]
 
   let total = 0;
   for (var i in arr) {
       total += arr[i];
   }
 
   let lastDigit= arr.pop()
   let consecutiveSum= lastDigit * (lastDigit+1) / 2
   let missingNumber= consecutiveSum - total
   
    res.send('Task given by Pritesh Sir = Problem 1')
});


router.get('/sol2', function (req, res) {
    let arr= [33, 34, 35, 37, 38]
    let len= arr.length
 
   let total = 0;
   for (var i in arr) {
       total += arr[i];
   }
 
   let firstDigit= arr[0]
   let lastDigit= arr.pop()
   let consecutiveSum= (len + 1) * (firstDigit+ lastDigit ) / 2
   let missingNumber= consecutiveSum - total
  
    res.send('Task given by Pritesh Sir = Problem 2')
});



router.get('/test-me1', function (req, res) {
    res.send('My second ever api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});

module.exports = router;
// adding this comment for no reason