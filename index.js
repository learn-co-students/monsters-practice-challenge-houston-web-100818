const monsterContainer = document.querySelector('#monster-container')
const createMonster = document.querySelector('#create-monster')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

let pageNum = 1;
let monstersList;

const fetchMonsters = function(){
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(function(response){
      return response.json()
    })
    .then( function(response){
      monstersList = response
      render()
  })
}

const render = function(){
  monsterContainer.innerHTML = ''
  monstersList.forEach(function(monster){
    const showMonster = document.createElement('div')
    monsterContainer.append(showMonster)
    showMonster.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>Bio: ${monster.description}</p>
    `
  })
}

const renderForm = function(){
  const monsterForm = document.createElement('form')
  createMonster.append(monsterForm)
  monsterForm.innerHTML = `
    <input name="name" placeholder="name">
    <input name="age" placeholder="age">
    <input name="description" placeholder="description">
    <button id="create-button">Create</button>
  `
  const createButton = document.querySelector('#create-button')
  createButton.addEventListener('click', function(e){
    e.preventDefault()
    postMonster()
  })
}


const postMonster = function(){
  console.log('mehhhhh')
  fetch('http://localhost:3000/monsters/', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('[name="name"]').value,
      age: parseInt(document.querySelector('[name="age"]').value),
      description: document.querySelector('[name="description"]').value
    })
  }).then(function(){
    document.querySelector('[name="name"]').value = ''
    document.querySelector('[name="age"]').value = ''
    document.querySelector('[name="description"]').value = ''
    fetchMonsters()
  })
}

fetchMonsters()
renderForm()
