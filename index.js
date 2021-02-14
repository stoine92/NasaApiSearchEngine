const URL = `https://images-api.nasa.gov/search?q=`;

function myFunction(e) {
  e.preventDefault();
  const inputForm = document.getElementById("submit-form");
  let imageSearch = inputForm.elements["image-search"].value;
  const imgDiv = document.getElementById("images");
 
  fetch(`${URL}${imageSearch}`)
    .then((response) => response.json())
    .then((data) => {
      // make sure only images
      let collection = data.collection.items.filter(
        (item) => item.data[0].media_type === "image"
      );
      imgDiv.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const item = collection[i];
        const image = item.links[0].href;

        const description = item.data[0].description;
        const imgElement = document.createElement("img");
        const descriptionElement = document.createElement("p");

        imgElement.src = image;
        imgElement.className = "test";
        descriptionElement.textContent = description;
        imgDiv.appendChild(imgElement);
        imgDiv.appendChild(descriptionElement);
      }
    })
    .catch((e) => console.log(e));
  inputForm.elements["image-search"].value = "";
}

const form = document.getElementById("submit-form");
form.addEventListener("submit", myFunction);
