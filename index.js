const monsterForm = document.querySelector('#create-monster')
const monsterContainer = document.querySelector('#monster-container')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

// DATA
let monsters
let currentPage = 1
const monstersPerPage = 50

// FETCH MONSTERSSSSS
fetch('http://localhost:3000/monsters')
.then(function(response) {
  return response.json()
}).then(function(result) {
  monsters = result
  render(currentPage)
})

// RENDERING FUNCTIONS
const render = function(currentPage) {
  renderForm()
  renderMonsterList(currentPage)
}

const renderMonsterList = function(currentPage) {
  monsterContainer.innerHTML = ''

  endIndex = currentPage * monstersPerPage
  startIndex = endIndex - monstersPerPage
  monsters.slice(startIndex, endIndex).forEach(function(monster) {
    renderMonster(monster)
  })
}

const renderMonster = function(monster) {
  const monsterCard = monsterContainer.appendChild(document.createElement('div'))
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
  `
}

const renderForm = function() {
  monsterForm.innerHTML = `
    <form id="monster-form">
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description...">
      <button>Create</button>
    </form>
  `
}

const createMonster = function(monster) {
  monsters.push(monster)
  fetch('http://localhost:3000/monsters/', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(monster)
  })
}

// EVENT LISTENERS
backButton.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--
    render(currentPage)
  } else {
    alert('CANT GO BACK. YOURE ON THE FIRST PAGE, MONSTER!')
  }
})

forwardButton.addEventListener('click', function() {
  totalPages = Math.ceil(monsters.length / monstersPerPage)
  if (currentPage < totalPages) {
    currentPage++
    render(currentPage)
  } else {
    alert('CANT GO FORWARD. NO MORE MONSTERS!')
  }
})

monsterForm.addEventListener('submit', function(event){
  event.preventDefault()

  const monster = {
    name: document.querySelector ("#name").value,
    age: document.querySelector("#age").value,
    description: document.querySelector("#description").value
  }
  createMonster(monster)
  render(currentPage)
})
