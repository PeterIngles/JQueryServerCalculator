$(document).ready(onReady)

let solution
let operator

function onReady() {
    $('#enterBtn').on('click', sendNumbers)
    $('#plusBtn').on('click', plusSelector)
    $('#minusBtn').on('click', minusSelector)
    $('#multiplyBtn').on('click', multiplySelector)
    $('#divideBtn').on('click', divideSelector)

    console.log('Hey Jquery is working')
    getSolution()
}

// Made operator selector functions
function plusSelector(event) {
    console.log('inside plusBtn')
    event.preventDefault();
    operator = '+'
    console.log(operator)
    return operator
}

function minusSelector(event) {
    console.log('inside minusBtn')
    event.preventDefault();
    operator = '-'
    console.log(operator)
    return operator
}

function multiplySelector(event) {
    console.log('inside multiplyBtn')
    event.preventDefault();
    operator = '*'
    console.log(operator)
    return operator
}

function divideSelector(event) {
    console.log('inside divideBtn')
    event.preventDefault();
    operator = '/'
    console.log(operator)
    return operator
}

// Create our POST function that will send the serverPackage to the server
let sendNumbers = (event) => {
    event.preventDefault();
    console.log('inside sendNumbers')
    const sentNumbers = {
        num1: $("#num1Input").val(),
        num2: $("#num2Input").val(),
        operation: operator
    }

    // AJAX to communicate and send data to server

    $.ajax({
        method: "POST", // type of request
        url: "/sendnumbers", //route that will be used
        data: sentNumbers // Needs to be an object

    }).then((response) => {
        console.log("POST was successful", response) //Expect 201
        getSolution()
        render()
    }).catch((error) => {
        console.log("Error with POST request", error)
        alert("Error with POST")
    })
    
    // Take some data and send to server
}

let getSolution = () => {
    // Use Ajax to retrieve (GET) quotes from server
    // Server endpooint: /quotes
    console.log('inside getSolution')

    //   AJAX
    $.ajax({
        // Tells Ajax how to communicate with server, 
        // also tells Ajax where to go on the server
        method: 'GET',
        url: '/solution'
    }).then((response) => {
        console.log(response)

        solution = response //Adds our quote to the DOM (as long as the server is still running)
        render()
    }).catch((error) => {
        alert("Request failed")
        console.log("Request failed", error)
    })
    
}


let render = () => {
    $("#output2").empty()
    $('#output2').append(`
        <li>
        <span>${solution.num1}</span> <span>${solution.num2}</span>
        </li>`)
    }