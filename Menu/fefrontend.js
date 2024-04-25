
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
    foodNameTag.innerText = "Name: " + data[i].name;
    foodTypeTag.innerText = "Type: " + data[i].type;
    foodDescriptionTag.innerText = "Description: " + data[i].description;
    foodPriceTag.innerText = "Price: $" + data[i].price;

    // Link image to src
    foodImage.src = data[i].img;

    // appendchild
    foodCard.appendChild(foodImage);
    foodCard.appendChild(foodNameTag);
    foodCard.appendChild(foodTypeTag);
    foodCard.appendChild(foodDescriptionTag);
    foodCard.appendChild(foodPriceTag);


    foodContainer.appendChild(foodCard);

    }
});
