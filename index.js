let page = 1
let monsterArray;

const monsterBox = document.getElementById('monster-container')
const createMonster = document.querySelector('#create-monster')
const back = document.getElementById('back')
const forward = document.getElementById('forward')
let lastMonster;

const monsterFetch = function(){
    fetch(`http://localhost:3000/monsters?_limit=1&_sort=id&_order=desc`)
    .then(response => response.json())
    .then((lastData)=>{lastMonster = lastData[0]})
    // console.log(lastMonster)
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
  monsterBox.innerHTML = ''
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
  createMonster.innerHTML = ''
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
  createMonsterButton.addEventListener('click', ((e)=>{
    e.preventDefault()
    let monster = {};
    monster.name = monsterName.value
    monster.age = monsterAge.value
    monster.description = monsterDescription.value                
    createNewMonster(monster)
  }))  
 
  monsterForm.append(monsterName, monsterAge, monsterDescription, createMonsterButton)
  createMonster.append(monsterForm)  
}

function createNewMonster(monster){
    console.log('Here be ', monster)
    fetch('http://localhost:3000/monsters/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(monster)
  })
  render()
}

back.addEventListener('click',(()=>{
  if (page > 1){      
    page--
    monsterFetch()
  } 
}))

forward.addEventListener('click',(()=>{
  if (isNotLastMonsterOnPage()) {
    page++
    monsterFetch()
  }
}))

function isNotLastMonsterOnPage() {
  if (monsterArray[monsterArray.length-1].id === lastMonster.id ) {
    return false
  } else {
    return true
  }
}

monsterFetch()