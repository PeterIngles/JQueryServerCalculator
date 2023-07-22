$(document).ready(onReady)

let server

function onReady() {
    $('.add-button').on('click', addFood)

    console.log('He Jquery is working')
    getFood()
}

let addFood = (event) => {
    event.preventDefault();
    console.log('inside addFood')
    const newFood = {
        food: $("#itemInput").val(),
        description: $("#descriptionInput").val()
    }

    // AJAX to communicate and send data to server

    $.ajax({
        method: "POST", // type of request
        url: "/addfood", //route that will be used
        data: newFood // Needs to be an object

    }).then((response) => {
        console.log("POST was successful", response) //Expect 201
        getFood()
        render()
    }).catch((error) => {
        console.log("Error with POST request", error)
        alert("Error with POST")
    })
    $('#itemInput').val("")
    $('#descriptionInput').val("")
    // Take some data and send to server
}

let getFood = () => {

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