let cardArray = [
{
    id: 1,
    name: "earth",
    img: "public/exercise-1/earth.svg",
},
{
    id: 2,
    name: "jupiter",
    img: "public/exercise-1/jupiter.svg",
},
{
    id: 3,
    name: "mars",
    img: "public/exercise-1/mars.svg",
},
{
    id: 4,
    name: "mercury",
    img: "public/exercise-1/mercury.svg",
},
{
    id: 5,
    name: "saturn",
    img: "public/exercise-1/saturn.svg",
},
{
    id: 6,
    name: "uranus",
    img: "public/exercise-1/uranus.svg",
},
{
    id: 7,
    name: "earth",
    img: "public/exercise-1/earth.svg",
},
{
    id: 8,
    name: "jupiter",
    img: "public/exercise-1/jupiter.svg",
},
{
    id: 9,
    name: "mars",
    img: "public/exercise-1/mars.svg",
},
{
    id: 10,
    name: "mercury",
    img: "public/exercise-1/mercury.svg",
},
{
    id: 11,
    name: "saturn",
    img: "public/exercise-1/saturn.svg",
},
{
    id: 12,
    name: "uranus",
    img: "public/exercise-1/uranus.svg",
},
]

const gridCards = document.querySelector("[data-function='grid']")
let score = document.querySelector("[data-function='score']")
let attemps = document.querySelector("[data-function='attempts']")
let card1;
let card2;

const startGame = () => {

    cardArray=cardArray.sort((a,b)=>{      
        return Math.pow(-1,(Math.floor(Math.random()+0.5)))
    })


    for (carta of cardArray)
        gridCards.innerHTML+=`
        <figure id="${carta.id}" class="card" data-function="${carta.name}">
            <div class="card-content">
                <div class="card-front">
                    <img src="public/exercise-1/universe.svg" />
                </div>
                <div class="card-back">
                    <img src="${carta.img}"/>
                </div>
            </div>
        </figure>
        `
    }

const addEventListeners = () => {

    const cards = document.querySelectorAll(".card")

    for (card of cards)
        card.addEventListener("click",selectCard,true) // Uso de useCapture - Duda
}    

const removeEventListeners = () => {

    const cards = document.querySelectorAll(".card")
    for (card of cards)
        card.removeEventListener("click",selectCard,true)
}

const selectCard = (e) => {
    
    let cardElement = e.target

    if(e.target.tagName ==="IMG")
        cardElement=cardElement.parentElement
   
    
    if(card1===undefined)
        {
            card1={
                id:cardElement.parentElement.parentElement.id,
                name:cardElement.parentElement.parentElement.dataset.function
            }
        }
    else if(card2===undefined)
        {
            card2={
                id:cardElement.parentElement.parentElement.id,
                name:cardElement.parentElement.parentElement.dataset.function            
            }

            isCorrectSelection(card1,card2)
        }

    // Damos la vuelta a la tarjeta
    

    if(cardElement.classList.contains('card-content'))
        cardElement.parentElement.classList.add("selected")
    
    if(cardElement.classList.contains('card-front'))
        cardElement.parentElement.parentElement.classList.add("selected")

    
    


}

const isCorrectSelection = (firstSelection,secondSelection) => {


    removeEventListeners()


    setTimeout(()=>{

        attemps.innerHTML++

    },1000)

    if(firstSelection.id === secondSelection.id)
        setTimeout(()=>{
            wrongSound()
            resetCards()
            addEventListeners()

        },1000)
    
    else if(firstSelection.name === secondSelection.name)
        setTimeout(()=>{
            succesSound()
            successCards()
            addEventListeners()
            score.innerHTML++
            isGameFinished()

        },1000)    
    else
    {
        setTimeout(()=>{
                wrongSound()
                resetCards()
                addEventListeners()
            
        },1000)                
    }

}

const resetCards = () => {

    const cards = document.querySelectorAll(".card")
    card1=undefined
    card2=undefined
    for (card of cards)
        card.classList.remove("selected")
}

const successCards = () => {
    const cards = document.querySelectorAll(".selected")
    for (card of cards)
        {
            card.classList.remove("selected")
            card.classList.add("success")
            card.querySelector(".card-back").querySelector("img").src="public/exercise-1/tick.svg"
        }

    card1=undefined
    card2=undefined
}

const succesSound = () => {
    const successSnd = new Audio("./public/exercise-1/sound/acierto.wav")
    successSnd.play()
    

}

const wrongSound = () => {
    const wrongSnd = new Audio("./public/exercise-1/sound/nope.wav")
    wrongSnd.play()

    setTimeout(() => {
        wrongSnd.play()
    },250)
}

const isGameFinished = () => {

    const cards = document.querySelectorAll(".card")
    const successes = document.querySelectorAll(".success")

    console.log(successes.length)

    if(cards.length === successes.length)
        {
            for(card of cards)
                party.confetti(card)

            setTimeout(()=>{
                modalGameOver()
            },500)
            
        }

  


}

const modalGameOver = () => {
    document.querySelector("body").innerHTML+=`
    <div class="modal modal-show">
        <div class="modal-content">
            <h3>Congratulaciones!</h3>
            <h3 class="score">${attemps.innerHTML}</h3>
            <h4>${attemps.innerHTML > 6 ? '¡Vamos, seguro que puedes mejorarlo!' : '¡Perfecto! ¡Enhorabuena!'}</h4>
        </div>
        
        </div>
  </body>`
}

startGame()
addEventListeners()

