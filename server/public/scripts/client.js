$(document).ready(onReady)

// Declare out serverPackage as an object


let solution = {};

function onReady() {
    $('#enterBtn').on('click', sendNumbers)
    $('#plusBtn').on('click', plusSelector)
    $('#minusBtn').on('click', minusSelector)
    $('#multiplyBtn').on('click', multiplySelector)
    $('#divideBtn').on('click', divideSelector)

    console.log('Hey Jquery is working')
    getSolution()
}




// Create our POST function that will send the serverPackage to the server
let sendNumbers = (event) => {
    event.preventDefault();
    console.log('inside sendNumbers')
    const sentNumbers = {
        num1: $("#num1Input").val(),
        num2: $("num2Input").val(),
        operation: $()
    }

    // AJAX to communicate and send data to server

    $.ajax({
        method: "POST", // type of request
        url: "/sendnumbers", //route that will be used
        data: serverPackage // Needs to be an object

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
  console.log('inside getFood')  

//   AJAX
    $.ajax({
        // Tells Ajax how to communicate with server, 
        // also tells Ajax where to go on the server
        method: 'GET',
        url: '/food'
    }).then((response) => {
        console.log(response)

        food = response //Adds our quote to the DOM (as long as the server is still running)
        render()
    }).catch((error) => {
        alert("Request failed")
        console.log("Request failed", error)
    })
}


let render = () => {
    $('#inventory').empty()

    // Looping over and appending to DOM
    for (let item of food){
        console.log(item)
        $('#inventory').append(`
        <li>
        <span>
        ${item.food}</span> <span>${item.description}</span>
        </li>
        `)
    }
}