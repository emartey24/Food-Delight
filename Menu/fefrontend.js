
fetch('http://localhost:3000/menu?all')
.then((response) => response.json())
.then((data) => {
    for (let i=0; i< data.length; i++){

    let foodContainer = document.getElementById("characterContainer");
    let foodCard = document.createElement("div");
    foodCard.classList.add("card");

    // food image element
    let foodImage = document.createElement("img");

    // Tags
    let foodNameTag = document.createElement("p");
    let foodTypeTag = document.createElement("p");
    let foodDescriptionTag = document.createElement("p");
    let foodPriceTag = document.createElement("p");

    // Values
    foodNameTag.innerText = "Name: " + data[i].food_name;
    foodTypeTag.innerText = "Type: " + data[i].food_type;
    foodDescriptionTag.innerText = "Description: " + data[i].food_description;
    foodPriceTag.innerText = "Price: $" + data[i].food_price;

    // Link image to src
    foodImage.src = data[i].food_img;

    // appendchild
    foodCard.appendChild(foodImage);
    foodCard.appendChild(foodNameTag);
    foodCard.appendChild(foodTypeTag);
    foodCard.appendChild(foodDescriptionTag);
    foodCard.appendChild(foodPriceTag);


    foodContainer.appendChild(foodCard);

    }
});

// Pop up to show message after customer places an order
function popup() {
    alert("Order Placed!");
}

// Gathers the form data and converts the URL, which contains the customer request data, into strings
// to use like a req.body on the server end

// the body is x-www-form-urlencoded instead of a raw JSON body we are used to
const form = document.querySelector('form')

form.addEventListener('submit', () => {
    const data = new FormData(form);
    const url = new URLSearchParams(data).toString();

    fetch('http://localhost:3000/order', {
        method: "POST", 
        body: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
})

