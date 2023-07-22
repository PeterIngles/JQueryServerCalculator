// Require express, to get access to functionality for building a server
const express = require('express')

// Body parser is required for POST request
const bodyParser= require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

let sendSolution = {};


app.get('/solution', (req, res) => {
    console.log("Arrived at /solution", sendSolution)

    // Server is responding with the quoteList
    res.send(sendSolution)
    // res.sendStatus(200)
})

app.post('/sendnumbers', (req, res) => {
    console.log("Body for /sendnumbers:", req.body);

    let mathToRun = req.body
    sendSolution = {
        num1: mathToRun.num1,
        num2: mathToRun.num2,
        operator: mathToRun.operator
    }

    console.log("current solution:", sendSolution)
    res.sendStatus(201)
})




// Port binding
app.listen(port, () => {
    console.log('listening on port', port)
})