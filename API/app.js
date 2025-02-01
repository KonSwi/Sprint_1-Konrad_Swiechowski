let currentPage = 1;
let currentFilter = "";
let currentStatus = "alive";
const charactersContainer = document.querySelector("#characters");
const filterInput = document.querySelector("#filterText");
filterText.style.borderRadius = "5px"
const header = document.querySelector("#header");
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
const prevPage = document.querySelector("#prevPage");
prevPage.style.backgroundColor = "#4ea8f9";
prevPage.style.width = "50px";
prevPage.style.height = "50px";
prevPage.style.margin = "10px";
prevPage.style.fontSize = "30px";
prevPage.style.color = "#ffff";
prevPage.style.borderRadius = "10px";
prevPage.style.cursor = "pointer";
const nextPage = document.querySelector("#nexPage");
nextPage.style.backgroundColor = "#4ea8f9";
nextPage.style.width = "50px";
nextPage.style.height = "50px";
nextPage.style.margin = "10px";
nextPage.style.fontSize = "30px";
nextPage.style.color = "#ffff";
nextPage.style.borderRadius = "10px";
nextPage.style.cursor = "pointer";
const statusFilters = document.querySelectorAll("input[name='status']");

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
  image.alt = `${person.name}'s photo`;
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
  character.appendChild(heading);
  heading.appendChild(image);
  heading.appendChild(nameElement);
  character.appendChild(dataElement);
  dataElement.appendChild(statusElement);
  dataElement.appendChild(speciesElement);
  return character;
}

function displayCharacters() {
  const apiUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${currentFilter}&status=${currentStatus}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.body.style.backgroundColor = "#FFEFD5";
      charactersContainer.style.display = "flex";
      charactersContainer.style.flexWrap = "wrap";
      charactersContainer.style.justifyContent = "center";
      charactersContainer.style.gap = "20px";
      charactersContainer.style.padding = "20px";
      charactersContainer.innerHTML = "";
      if (data.results.length === 0) {
        charactersContainer.innerHTML =
          "<p>Nie znaleziono postaci spełniających kryteria wyszukiwania.</p>";
      } else {
        data.results.forEach((person) => {
          const character = createCharacterCard(person);
          charactersContainer.appendChild(character);
        });
      }
      prevPage.disabled = !data.info.prev;
      nextPage.disabled = !data.info.next;
    })
    .catch(() => {});
  charactersContainer.innerHTML =
    "<p>Nie znaleziono postaci spełniających kryteria wyszukiwania.</p>";
}

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
displayCharacters();
