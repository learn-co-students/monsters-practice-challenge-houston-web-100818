let page = 1
let monsterArray;

const monsterBox = document.getElementById('monster-container')

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



monsterFetch()