let page = 1
let monsterArray;

const monsterBox = document.getElementById('monster-container')
const createMonster = document.querySelector('#create-monster')

const monsterFetch = function(){
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(function(response){
        return response.json()
    }).then ((data)=> {
        monsterArray = data
        render()
    })
} 

function render() {
  buildMonsterCards()
  buildMonsterForm()
}

let buildMonsterCards = function() {
  monsterArray.forEach(function (monster) {
    let monsterCard = document.createElement('div')
    monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description} </p>
    `        
    monsterBox.append(monsterCard)
  })
}

let buildMonsterForm = function() {
  let monsterForm = document.createElement('form')
  let monsterName = document.createElement('input')
  let monsterAge = document.createElement('input')
  let monsterDescription = document.createElement('input')
  let createMonsterButton = document.createElement('button')

  monsterForm.id = 'monster-form'
  
  monsterName.id = 'monster-name'
  monsterName.placeholder = 'name...'
  monsterAge.id = 'monster-age'
  monsterAge.placeholder = 'age...'
  monsterDescription.id = 'monster-description'
  monsterDescription.placeholder = 'description...'
  createMonsterButton.innerText = 'Create'

  monsterForm.append(monsterName, monsterAge, monsterDescription, createMonsterButton)
  createMonster.append(monsterForm)  
}


monsterFetch()