// Require express, to get access to functionality for building a server
const express = require('express')

// Body parser is required for POST request
const bodyParser= require('body-parser');
const send = require('send');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))


let mathToRun
let solutionPackage
let solution
let sendSolution = []



function calculatorFunction(){
    console.log("inside calculatorFunction")
    if(mathToRun.operation == "+"){
        solution = Number(mathToRun.num1) + Number(mathToRun.num2)
    } else if (mathToRun.operation == "-"){
        solution = Number(mathToRun.num1) - Number(mathToRun.num2)
    } else if (mathToRun.operation == "*"){
        solution = Number(mathToRun.num1) * Number(mathToRun.num2)
    } else {
        solution = Number(mathToRun.num1) / Number(mathToRun.num2)
        
    }
 solutionPackage = {
    num1: mathToRun.num1,
    num2: mathToRun.num2,
    operation: mathToRun.operation,
    answer: solution
}
sendSolution.unshift(solutionPackage)
}

app.get('/solution', (req, res) => {
    console.log("Arrived at /solution", sendSolution)

    // Server is responding with the quoteList
    res.send(sendSolution)
    // res.sendStatus(200)
})

app.post('/sendnumbers', (req, res) => {
    console.log("Body for /sendnumbers:", req.body);
    // console.log(req.body.operation)
    // if(!req.body.num1 ||! req.body.num2 || req.body.operation){
    //     // Tried to prevent it from pulling if the the inputs are empty
    // } else{ 
        mathToRun = req.body
        
        calculatorFunction(mathToRun)
    
   
    res.sendStatus(201)
})




// Port binding
app.listen(port, () => {
    console.log('listening on port', port)
})