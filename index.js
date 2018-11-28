const monsterContainer = document.querySelector("#monster-container");
const forwardButton = document.querySelector("#forward");
const backButton = document.querySelector("#back");
const createMonster = document.querySelector("#create-monster");

let monsters;
let pageNumber = 1;

const getData = () => {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      monsters = result;
      render();
    });
};

function render() {
  monsterContainer.innerHTML = "";
  monsters.forEach(function(monster) {
    const monsterName = document.createElement("h2");
    monsterName.innerHTML = monster.name;
    monsterContainer.append(monsterName);
    const monsterAge = document.createElement("h4");
    monsterAge.innerHTML = `Age: ${monster.age}`;
    monsterContainer.append(monsterAge);
    const monsterDescription = document.createElement("p");
    monsterDescription.innerHTML = `Bio: ${monster.description}`;
    monsterContainer.append(monsterDescription);
  });
}

forwardButton.addEventListener("click", function(e) {
  pageNumber++;
  getData();
});

backButton.addEventListener("click", function(e) {
  if (pageNumber == 1) {
    alert("Aint no monsters here");
  } else {
    pageNumber--;
    getData();
  }
});

function renderForm() {
  createMonster.innerHTML = "";
  const nameField = document.createElement("input");
  nameField.name = "name";
  nameField.placeholder = "name...";
  createMonster.append(nameField);
  const ageField = document.createElement("input");
  ageField.name = "age";
  ageField.placeholder = "age...";
  createMonster.append(ageField);
  const descriptionField = document.createElement("input");
  descriptionField.name = "decription";
  descriptionField.placeholder = "description...";
  createMonster.append(descriptionField);
  const createButton = document.createElement("button");
  createButton.innerHTML = "Create";
  createMonster.append(createButton);
  createButton.addEventListener("click", function(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/monsters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameField.value,
        age: parseInt(ageField.value),
        description: descriptionField.value
      })
    });
    console.log(monsters[monsters.length - 1]);
    getData();
  });
}

renderForm();
getData();
