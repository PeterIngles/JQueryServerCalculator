// Require express, to get access to functionality for building a server
const express = require('express')

// Body parser is required for POST request
const bodyParser= require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

let foodList = [];


app.get('/food', (req, res) => {
    console.log("Arrived at /food", foodList)

    // Server is responding with the quoteList
    res.send(foodList)
    // res.sendStatus(200)
})

app.post('/addfood', (req, res) => {
    console.log("Body for addfood:", req.body);

    let foodToAdd = req.body
    foodList.push(foodToAdd)

    console.log("current food list:", foodList)
    res.sendStatus(201)
})




// Port binding
app.listen(port, () => {
    console.log('listening on port', port)
})