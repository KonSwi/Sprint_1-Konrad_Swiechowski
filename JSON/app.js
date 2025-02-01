// POBRANIE 20 POSTACI I WYŚWIETLENIE W KONSOLI

// fetch("https://rickandmortyapi.com/api/character/?page=1")
//   .then(response => response.json())
//   .then(data => {
//     const characters = data.results.slice(0, 20).map(person => ({
//       id: person.id,
//       name: person.name,
//       status: person.status,
//       species: person.species,
//       image: person.image
//     }));
//     console.log(JSON.stringify({ characters }, null, 1));
//   })
//   .catch((error) => {
//     console.error("Błąd:", error);
//   });

let currentPage = 1;
let currentFilter = "";
let currentStatus = "";
let allCharacters = [];
const charactersContainer = document.querySelector("#characters");
const filterInput = document.querySelector("#filterText");
filterText.style.borderRadius = "5px";
const header = document.querySelector("#header");
const statusFilters = document.querySelectorAll("input[name='status']");
header.style.display = "flex";
header.style.justifyContent = "center";
header.style.alignItems = "center";
header.style.padding = "20px";
header.style.fontSize = "large";
const headerChildren = document.querySelectorAll("#header *");
headerChildren.forEach((element) => {
  element.style.padding = "10px";
});
const footer = document.querySelector("#footer");
footer.style.display = "flex";
footer.style.justifyContent = "center";
footer.style.flexDirection = "column";
footer.style.alignItems = "center";
const prevPage = document.querySelector("#prevPage");
prevPage.style.backgroundColor = "#4ea8f9";
prevPage.style.width = "50px";
prevPage.style.height = "50px";
prevPage.style.margin = "10px";
prevPage.style.fontSize = "30px";
prevPage.style.color = "#ffff";
prevPage.style.borderRadius = "10px";
prevPage.style.cursor = "pointer";
const nextPage = document.querySelector("#nextPage");
nextPage.style.backgroundColor = "#4ea8f9";
nextPage.style.width = "50px";
nextPage.style.height = "50px";
nextPage.style.margin = "10px";
nextPage.style.fontSize = "30px";
nextPage.style.color = "#ffff";
nextPage.style.borderRadius = "10px";
nextPage.style.cursor = "pointer";
const addCharacter = document.querySelector("#addCharacter");
addCharacter.style.display = "flex";
addCharacter.style.flexDirection = "column";
addCharacter.style.alignItems = "center";
addCharacter.style.borderRadius = "10px";
addCharacter.style.padding = "20px";
addCharacter.style.backgroundColor = "#FFFFE0";
const characterForm = document.querySelector("#characterForm");
characterForm.style.display = "flex";
characterForm.style.flexDirection = "column";
characterForm.style.gap = "10px";
characterForm.style.width = "30vh";
characterForm.style.margin = "0 auto";
const characterFormChildren = document.querySelectorAll("#characterForm *");
characterFormChildren.forEach((element) => {
  element.style.display = "flex";
  element.style.padding = "5px";
  element.style.justifyContent = "center";
  element.style.borderRadius = "10px";
});
const submit = document.querySelector("#submit");
submit.style.backgroundColor = "#4ea8f9";
submit.style.color = "#ffff";
submit.style.cursor = "pointer";
const nameInput = document.querySelector("#name");
const speciesInput = document.querySelector("#species");
const statusInput = document.querySelector("#selectStatus");

const charactersPerPage = 5;

function fetchAllCharacters() {
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((data) => {
      allCharacters = data;
      displayCharacters();
    })
    .catch((error) => {
      console.error("Błąd:", error);
      charactersContainer.innerHTML =
        "<h1 id='errorMessage'>Wystąpił błąd przy ładowaniu postaci.</h1>";
      const errorMessage = document.querySelector("#errorMessage");
      errorMessage.style.textAlign = "center";
      errorMessage.style.color = "#FF0000";
    });
}

function displayCharacters() {
  let filteredCharacters = allCharacters.filter((person) => {
    return (
      person.name.toLowerCase().includes(currentFilter.toLowerCase()) &&
      (currentStatus === "" ||
        person.status.toLowerCase() === currentStatus.toLowerCase())
    );
  });

  filteredCharacters = filteredCharacters.sort((a, b) => a.id - b.id);
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const pageCharacters = filteredCharacters.slice(startIndex, endIndex);
  document.body.style.backgroundColor = "#FFEFD5";
  charactersContainer.style.display = "flex";
  charactersContainer.style.flexWrap = "wrap";
  charactersContainer.style.justifyContent = "center";
  charactersContainer.style.gap = "20px";
  charactersContainer.style.padding = "20px";
  charactersContainer.innerHTML = "";
  if (pageCharacters.length === 0) {
    charactersContainer.innerHTML =
      "<p>Nie znaleziono postaci spełniających kryteria wyszukiwania.</p>";
  } else {
    pageCharacters.forEach((person) => {
      const characterCard = createCharacterCard(person);
      charactersContainer.appendChild(characterCard);
    });
  }
  prevPage.disabled = currentPage === 1;
  nextPage.disabled =
    filteredCharacters.length <= currentPage * charactersPerPage;
}

function createCharacterCard(person) {
  const character = document.createElement("div");
  character.style.display = "flex";
  character.style.flexDirection = "column";
  character.style.border = "1px solid #ccc";
  character.style.borderRadius = "10px";
  character.style.padding = "10px";
  character.style.backgroundColor = "#FFFFE0";
  character.style.width = "180px";
  const heading = document.createElement("div");
  heading.style.display = "flex";
  heading.style.flexDirection = "column";
  heading.style.alignItems = "center";
  const image = document.createElement("img");
  image.src = person.image;
  image.alt = person.name;
  image.style.width = "150px";
  image.style.borderRadius = "10px";
  image.style.marginBottom = "20px";
  const nameElement = document.createElement("p");
  nameElement.textContent = person.name;
  nameElement.style.fontSize = "18px";
  nameElement.style.fontWeight = "bold";
  const dataElement = document.createElement("div");
  dataElement.style.display = "flex";
  dataElement.style.flexDirection = "column";
  const statusElement = document.createElement("p");
  statusElement.textContent = `Status: ${person.status}`;
  const speciesElement = document.createElement("p");
  speciesElement.textContent = `Gatunek: ${person.species}`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Usuń postać";
  deleteButton.style.borderRadius = "5px";
  deleteButton.style.cursor = "pointer";
  deleteButton.onclick = () => deleteCharacter(person.id);
  character.appendChild(heading);
  heading.appendChild(image);
  heading.appendChild(nameElement);
  character.appendChild(dataElement);
  dataElement.appendChild(statusElement);
  dataElement.appendChild(speciesElement);
  character.appendChild(deleteButton);
  return character;
}

function deleteCharacter(id) {
  fetch(`http://localhost:3000/characters/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchAllCharacters();
    })
    .catch((error) => console.error("Błąd:", error));
}

characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCharacter = {
    name: nameInput.value,
    species: speciesInput.value,
    status: statusInput.value,
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  };

  fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json())
    .then(() => {
      displayCharacters();
    })
    .catch((error) => console.error("Błąd:", error));
});

filterInput.addEventListener("input", (event) => {
  currentFilter = event.target.value;
  currentPage = 1;
  displayCharacters();
});

statusFilters.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    currentStatus = event.target.id;
    currentPage = 1;
    displayCharacters();
  });
});

prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCharacters();
  }
});

nextPage.addEventListener("click", () => {
  currentPage++;
  displayCharacters();
});

fetchAllCharacters();
