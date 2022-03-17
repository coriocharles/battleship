//Board
const playerTiles = document.querySelectorAll(".tile")
const computerTiles = document.querySelectorAll(".ctile")
const playerShips = document.querySelectorAll("#ship")
const computerShips = document.querySelectorAll("#cship")
const trymove = document.querySelector(".trymove")
const reset = document.querySelector(".reset")
const playerscore = document.querySelector(".playerscore")
const computerscore = document.querySelector(".computerscore")
const playerwins = document.querySelector(".playerwins")
const computerwins = document.querySelector(".computerwins")

//Player Boats
const scoutPlayerV = document.querySelector(".setSBv")
const scoutPlayerH = document.querySelector(".setSBh")
const subPlayerV = document.querySelector(".setSubv")
const subPlayerH= document.querySelector(".setSubh")
const BSPlayerV = document.querySelector(".setBSv")
const BSPlayerH = document.querySelector(".setBSh")
const ACPlayerV = document.querySelector(".setACv")
const ACPlayerH = document.querySelector(".setACh")

//Computer Boat Status
const cstatusSB = document.querySelector(".statuscSB")
const cstatusSub = document.querySelector(".statuscSub")
const cstatusBS = document.querySelector(".statuscBS")
const cstatusAC = document.querySelector(".statuscAC")

//Variables
let pwins = 0
let cwins = 0
 

let subPlaced = false
let scoutPlaced = false
let ACPlaced = false
let BSPlaced = false



//creating 2d array & related variables
let pboard = []
let array1 = []
let array2 = []
let array3 = []
let array4 = []
let array5 = []
let array6 = []
let array7 = []
let array8 = []
for (let i = 0; i < playerTiles.length; i++) {
    if (i < 8) {
        array1.push(playerTiles[i])
    }
    if (i < 16 && i >= 8) {
        array2.push(playerTiles[i])
    }
    if (i < 24 && i >= 16) {
        array3.push(playerTiles[i])
    }
    if (i < 32 && i >= 24) {
        array4.push(playerTiles[i])
    }
    if (i < 40 && i >= 32) {
        array5.push(playerTiles[i])
    }
    if (i < 48 && i >= 40) {
        array6.push(playerTiles[i])
    }
    if (i < 56 && i >= 48) {
        array7.push(playerTiles[i])
    }
    if (i < 64 && i >= 56) {
        array8.push(playerTiles[i])
    }
}
pboard.push(array1)
pboard.push(array2)
pboard.push(array3)
pboard.push(array4)
pboard.push(array5)
pboard.push(array6)
pboard.push(array7)
pboard.push(array8)

let currentTarget = ""
let targetrow = 0
let targetcolumn = 0
let cboard = []
let carray1 = []
let carray2 = []
let carray3 = []
let carray4 = []
let carray5 = []
let carray6 = []
let carray7 = []
let carray8 = []

for (let i = 0; i < computerTiles.length; i++) {
    if (i < 8) {
        carray1.push(computerTiles[i])
    }
    if (i < 16 && i >= 8) {
        carray2.push(computerTiles[i])
    }
    if (i < 24 && i >= 16) {
        carray3.push(computerTiles[i])
    }
    if (i < 32 && i >= 24) {
        carray4.push(computerTiles[i])
    }
    if (i < 40 && i >= 32) {
        carray5.push(computerTiles[i])
    }
    if (i < 48 && i >= 40) {
        carray6.push(computerTiles[i])
    }
    if (i < 56 && i >= 48) {
        carray7.push(computerTiles[i])
    }
    if (i < 64 && i >= 56) {
        carray8.push(computerTiles[i])
    }
}

cboard.push(carray1)
cboard.push(carray2)
cboard.push(carray3)
cboard.push(carray4)
cboard.push(carray5)
cboard.push(carray6)
cboard.push(carray7)
cboard.push(carray8)
console.log(cboard)

//Event listener for attack (includes computer attack)
trymove.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#input').value;
    if (subPlaced == false || scoutPlaced == false || ACPlaced == false || BSPlaced == false) {
        alert("place your ships first!")
    } else if (gameOver()) {
        alert("the current game has been finished")
    }
    else {
    if (textInput != "") {
    attack(textInput)
    document.querySelector('#input').value = ""
    gameOver()
    if (!gameOver()) {
        if (currentTarget == ""){
            setTimeout(computerAttack, 1000)
        } else {
            setTimeout(computerAttackTarget,1000)
        }
        gameOver()
    }} else {
        alert("Please enter a valid move!")
    }
    console.log(currentTarget)
    console.log(targetrow)
    console.log(targetcolumn)
}
})


//Start New Game button
reset.addEventListener("click", event=> {
    event.preventDefault()
    resetGame()
})


// Logic for Player attack
function attack(text) {
    for (let i = 0; i < computerTiles.length; i++){
        if(computerTiles[i].innerText == text && computerTiles[i].id == "ship") {
            computerTiles[i].setAttribute("id", "hit")
            if (computerTiles[i].classList.contains("cSB")) {
                cSBlife -=1
                console.log(cSBlife)
                if (cSBlife == 0) {
                    alert("You sunk the enemy Scout Boat!")
                }
                
            }
            if (computerTiles[i].classList.contains("cSub")) {
                cSublife -= 1
                console.log(cSublife)
                if (cSublife == 0) {
                    alert("You sunk the enemy Sub!")
                }
                
            }
            if (computerTiles[i].classList.contains("cBS")) {
                cBSlife -= 1
                console.log(cBSlife)
                if (cBSlife == 0) {
                    alert("You sunk the enemy Battleship!")
                }
                
            }
            if (computerTiles[i].classList.contains("cAC")) {
                cAClife -= 1
                console.log(cAClife)
                if (cAClife == 0) {
                    alert("You sunk the enemy Aircraft Carrier!")
                }
                
            }
        } else if (computerTiles[i].innerText == text && computerTiles[i].id == "") {
            computerTiles[i].setAttribute("id", "miss")
        } else if (computerTiles[i].innerText == text && computerTiles[i].id == "miss") {
            alert("you've already fired here...you waste a turn!")
        }
    }
    if (cSBlife == 0) {
        cstatusSB.innerText = "SUNK"
        cstatusSB.style.color = "red"
    }
    if (cSublife == 0) {
        cstatusSub.innerText = "SUNK"
        cstatusSub.style.color = "red"
    }
    if (cBSlife == 0) {
        cstatusBS.innerText = "SUNK"
        cstatusBS.style.color = "red"
    }
    if (cAClife == 0) {
        cstatusAC.innerText = "SUNK"
        cstatusAC.style.color = "red"
    }
   
}

//Determine if game is over or not
function gameOver() {
    if (pSBlife <= 0 && pSublife <= 0 && pBSlife <= 0 && pAClife <= 0) {
        alert("Computer WINS!")
        cwins += 1
        return true
    }
    if (cSBlife == 0 && cSublife == 0 && cBSlife == 0 && cAClife == 0) {
        alert("Player Wins!")
        pwins += 1
        return true
    }
}

//Computer attack if no target is currently selected
// function computerAttack(){
//     let successfulAttack = false
//     while (successfulAttack == false) {
//     compattempt = Math.floor(Math.random() * 64)
//     for (let i = 0; i < computerTiles.length; i++) {
//         if (playerTiles[i].innerText == String(compattempt) && playerTiles[i].id == "playership") {
//             playerTiles[i].setAttribute("id", "hit")
//             if (playerTiles[i].classList.contains("pSB")) {
//                 pSBlife -= 1
//                 successfulAttack = true
//                 currentTarget = "pSB"
//             }
//             if (playerTiles[i].classList.contains("pSub")) {
//                 pSublife -= 1
//                 successfulAttack = true
//                 currentTarget = "pSub"
//             }
//             if (playerTiles[i].classList.contains("pBS")) {
//                 pBSlife -= 1
//                 successfulAttack = true
//                 currentTarget = "pBS"
//             }
//             if (playerTiles[i].classList.contains("pAC")) {
//                 pAClife -= 1
//                 successfulAttack = true
//                 currentTarget = "pAC"
//             }
//         }  else if (playerTiles[i].innerText == String(compattempt) && playerTiles[i].id == "") {
//             playerTiles[i].setAttribute("id", "miss")
//             successfulAttack = true
//         }
// }}}
function computerAttack() {
    let successfulAttack = false
    while (successfulAttack == false) {
        compattempt = Math.floor(Math.random() * 64)
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
            if (pboard[i][j].innerText == String(compattempt) && pboard[i][j].id == "playership") {
                pboard[i][j].setAttribute("id", "hit")
                if (pboard[i][j].classList.contains("pSB")) {
                    pSBlife -= 1
                    successfulAttack = true
                    currentTarget = "pSB"
                    targetrow= i
                    targetcolumn = j
                }
                if (pboard[i][j].classList.contains("pSub")) {
                    pSublife -= 1
                    successfulAttack = true
                    currentTarget = "pSub"
                    targetrow = i
                    targetcolumn = j
                }
                if (pboard[i][j].classList.contains("pBS")) {
                    pBSlife -= 1
                    successfulAttack = true
                    currentTarget = "pBS"
                    targetrow= i
                    targetcolumn = j
                }
                if (pboard[i][j].classList.contains("pAC")) {
                    pAClife -= 1
                    successfulAttack = true
                    currentTarget = "pAC"
                    targetrow = i
                    targetcolumn = j
                }
            } else if (pboard[i][j].innerText == String(compattempt) && pboard[i][j].id == "") {
                pboard[i][j].setAttribute("id", "miss")
                successfulAttack = true
            }
        }
    }
}
console.log("working")
}

// computer attack AI when it has a target
function computerAttackTarget() {
    console.log("attempting attack")
    let successfulAttack = false
    try {
    while (successfulAttack == false) {
        direction = Math.floor(Math.random() * 5)
        console.log(`the direction is ${direction}`)
        if (currentTarget == "pAC") {
            compattempt = Math.floor(Math.random() * 6)
            if (direction == 1) {
                if (pboard[targetrow - compattempt][targetcolumn].id == "") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow - compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow - compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pAClife -= 1
                    if (pAClife <= 0) {
                        currentTarget = ""
                    }
                    if (pAClife == 0) {
                        alert("The enemy has sunk your Aircraft Carrier!")
                    }
                } 
            }
            if (direction == 2) {
                if (pboard[targetrow + compattempt][targetcolumn].id == "") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow + compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow + compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pAClife -= 1
                    if (pAClife <= 0) {
                        currentTarget = ""
                    }
                    if (pAClife == 0) {
                        alert("The enemy has sunk your Aircraft Carrier!")
                    }
                }
            } if (direction == 3) {
                if (pboard[targetrow][targetcolumn - compattempt].id == "") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn - compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn - compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pAClife -= 1
                    if (pAClife <= 0) {
                        currentTarget = ""
                    }
                    if (pAClife == 0) {
                        alert("The enemy has sunk your Aircraft Carrier!")
                    }
                }
            } if (direction == 4) {
                if (pboard[targetrow][targetcolumn + compattempt].id == "") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn + compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn + compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pAClife -= 1
                    if (pAClife <= 0) {
                        currentTarget = ""
                    }
                    if (pAClife == 0) {
                        alert("The enemy has sunk your Aircraft Carrier!")
                    }
                }
            }
    }
        if (currentTarget == "pSub") {
            compattempt = Math.floor(Math.random() * 3)
            if (direction == 1) {
                if (pboard[targetrow - compattempt][targetcolumn].id == "") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow - compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow - compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pSublife-= 1
                    if (pSublife <= 0) {
                        currentTarget = ""
                    }
                    if (pSublife == 0) {
                        alert("The enemy has sunk your Sub!")
                    }
                }
            }
            if (direction == 2) {
                if (pboard[targetrow + compattempt][targetcolumn].id == "") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow + compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow + compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pSublife -= 1
                    if (pSublife <= 0) {
                        currentTarget = ""
                    }
                    if (pSublife == 0) {
                        alert("The enemy has sunk your Sub!")
                    }
                }
            } if (direction == 3) {
                if (pboard[targetrow][targetcolumn - compattempt].id == "") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn - compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn - compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pSublife -= 1
                    if (pSublife <= 0) {
                        currentTarget = ""
                    }
                    if (pSublife == 0) {
                        alert("The enemy has sunk your Sub!")
                    }
                }
            } if (direction == 4) {
                if (pboard[targetrow][targetcolumn + compattempt].id == "") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn + compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn + compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pSublife -= 1
                    if (pSublife <= 0) {
                        currentTarget = ""
                    }
                    if (pSublife == 0) {
                        alert("The enemy has sunk your Sub!")
                    }
                }
            }
        }
        if (currentTarget == "pBS") {
            compattempt = Math.floor(Math.random() * 4)
            if (direction == 1) {
                if (pboard[targetrow - compattempt][targetcolumn].id == "") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow - compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow - compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pBSlife -= 1
                    if (pBSlife <= 0) {
                        currentTarget = ""
                    }
                    if (pBSlife == 0) {
                        alert("The enemy has sunk your Battleship!")
                    }
                }
            }
            if (direction == 2) {
                if (pboard[targetrow + compattempt][targetcolumn].id == "") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow + compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow + compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pBSlife -= 1
                    if (pBSlife <= 0) {
                        currentTarget = ""
                    }
                    if (pBSlife == 0) {
                        alert("The enemy has sunk your Battleship!")
                    }
                }
            } if (direction == 3) {
                if (pboard[targetrow][targetcolumn - compattempt].id == "") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn - compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn - compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pBSlife -= 1
                    if (pBSlife <= 0) {
                        currentTarget = ""
                    }
                    if (pBSlife == 0) {
                        alert("The enemy has sunk your Battleship!")
                    }
                }
            } if (direction == 4) {
                if (pboard[targetrow][targetcolumn + compattempt].id == "") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn + compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn + compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pBSlife -= 1
                    if (pBSlife <= 0) {
                        currentTarget = ""
                    }
                    if (pBSlife == 0) {
                        alert("The enemy has sunk your Battleship!")
                    }
                }
            }


        }
        if (currentTarget == "pSB") {
            compattempt = Math.floor(Math.random() * 2)
            if (direction == 1) {
                if (pboard[targetrow - compattempt][targetcolumn].id == "") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow - compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow - compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow - compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pSBlife -= 1
                    if (pSBlife <= 0) {
                        currentTarget = ""
                    }
                    if (pSBlife == 0) {
                        alert("The enemy has sunk your Scout Boat!")
                    }
                }
            }
            if (direction == 2) {
                if (pboard[targetrow + compattempt][targetcolumn].id == "") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow + compattempt][targetcolumn].classList.contains(currentTarget) && pboard[targetrow + compattempt][targetcolumn].id != "hit") {
                    pboard[targetrow + compattempt][targetcolumn].setAttribute("id", "hit")
                    successfulAttack = true
                    pSBlife -= 1
                    if (pSBlife <= 0) {
                        currentTarget = ""
                    }
                    if (pSBlife == 0) {
                        alert("The enemy has sunk your Scout Boat!")
                    }
                }
            } if (direction == 3) {
                if (pboard[targetrow][targetcolumn - compattempt].id == "") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn - compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn - compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn - compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pSBlife -= 1
                    if (pSBlife <= 0) {
                        currentTarget = ""
                    }
                    if (pSBlife == 0) {
                        alert("The enemy has sunk your Scout Boat!")
                    }
                }
            } if (direction == 4) {
                if (pboard[targetrow][targetcolumn + compattempt].id == "") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "miss")
                    successfulAttack = true
                } else if (pboard[targetrow][targetcolumn + compattempt].classList.contains(currentTarget) && pboard[targetrow][targetcolumn + compattempt].id != "hit") {
                    pboard[targetrow][targetcolumn + compattempt].setAttribute("id", "hit")
                    successfulAttack = true
                    pSBlife -= 1
                    if (pSBlife <= 0) {
                        currentTarget = ""
                    }
                    if (pSBlife == 0) {
                        alert("The enemy has sunk your Scout Boat!")
                    }
                }
            }


        }
}
} catch(err) {
    console.log(err)
    computerAttackTarget()
}
}




//Starting new game
function resetGame() {
    playerwins.innerText = `You've won ${pwins} games.`
    computerwins.innerText = `The enemy has won ${cwins} games.`
    subPlaced = false
    scoutPlaced = false
    ACPlaced = false
    BSPlaced = false
    cSBset = false
    cSubset = false
    cBSset = false
    cACset = false
    cSBlife = 2
    cSublife = 3
    cBSlife = 4
    cAClife = 5
    pSBlife = 2
    pSublife = 3
    pBSlife = 4
    pAClife = 5
    cstatusSB.innerText = "Alive"
    cstatusSub.innerText = "Alive"
    cstatusBS.innerText = "Alive"
    cstatusAC.innerText = "Alive"
    cstatusSB.style.color = "lightgreen"
    cstatusSub.style.color = "lightgreen"
    cstatusBS.style.color = "lightgreen"
    cstatusAC.style.color = "lightgreen"
    for (let i = 0; i < computerTiles.length; i++) {
        if (computerTiles[i].id == "ship" || computerTiles[i].id == "miss" || computerTiles[i].id == "hit") {
            computerTiles[i].setAttribute("id", "")
        }
        if (computerTiles[i].class == "cSB" || computerTiles[i].class == "cSub" || computerTiles[i].class == "cBS" || computerTiles[i].class == "cAC") {
            computerTiles[i].classList.remove("cSB")
            computerTiles[i].classList.remove("cSub")
            computerTiles[i].classList.remove("cBS")
            computerTiles[i].classList.remove("cAC")
        }
    } 
    for (let i = 0; i < playerTiles.length; i++) {
        if (playerTiles[i].id == "playership" || playerTiles[i].id == "miss" || playerTiles[i].id == "hit") {
            playerTiles[i].setAttribute("id", "")
        }
        if (playerTiles[i].class == "pSB" || playerTiles[i].class == "pSub" || playerTiles[i].class == "pBS" || playerTiles[i].class == "pAC") {
            playerTiles[i].classList.remove("pSB")
            playerTiles[i].classList.remove("pSub")
            playerTiles[i].classList.remove("pBS")
            playerTiles[i].classList.remove("pAC")
        }
    }
    while (cSBset == false) {
    setComputerSB()}
    while (cSubset == false) {
    setComputerSub()}
    while (cBSset == false) {
    setComputerBS()}
    while (cACset == false) {
    setComputerAC()}

    alert("Pick Your Ships!")
}


//Player Boat placement 
let pSBlife = 2
let pSublife = 3
let pBSlife = 4
let pAClife = 5


//SUBMARINE PLACEMENT
subPlayerH.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputSub').value;
    placeSubHorizontal(textInput)
    document.querySelector('#inputSub').value = ""

})
function placeSubHorizontal(num) {
if (subPlaced == false){
for (let i = 0; i < pboard.length; i++) {
    for (let j = 0; j < pboard[i].length; j++) {
        let row = i
        let column = j
        if (subPlaced == false && pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row][column + 1].id != "playership" && pboard[row][column + 2].id != "playership") {
            pboard[row][column].setAttribute("id", "playership")
            pboard[row][column + 1].setAttribute("id", "playership")
            pboard[row][column + 2].setAttribute("id", "playership")
            pboard[row][column].classList.add("class", "pSub")
            pboard[row][column + 1].classList.add("class", "pSub")
            pboard[row][column + 2].classList.add("class", "pSub")
            subPlaced = true
        } 
    }
}} else if (subPlaced == true) {
    alert("You've already placed your submarine.")
} else {
    alert("you can't place it there.")
}
}
subPlayerV.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputSub').value;
    placeSubVertical(textInput)
    document.querySelector('#inputSub').value = ""
})
function placeSubVertical(num) {
if (subPlaced == false) {
    for (let i = 0; i < pboard.length; i++) {
        for (let j = 0; j < pboard[i].length; j++) {
            let row = i
            let column = j
            try {if (pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row +1 ][column].id != "playership" && pboard[row +2 ][column].id != "playership") {
                pboard[row][column].setAttribute("id", "playership")
                pboard[row + 1][column].setAttribute("id", "playership")
                pboard[row + 2][column].setAttribute("id", "playership")
                pboard[row][column].classList.add("class", "pSub")
                pboard[row + 1][column].classList.add("class", "pSub")
                pboard[row + 2][column].classList.add("class", "pSub")
                subPlaced = true
            }
            } 
            catch(err) {
                alert("You can't place your submarine there.")
            }
        }
    }
} else if (subPlaced == true) {
    alert("You've already placed your submarine.")
} else {
    alert("you can't place it there.")
}}

//SCOUTBOAT PLACEMENT
scoutPlayerH.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputSB').value;
    placeSBHorizontal(textInput)

    document.querySelector('#inputSB').value = ""

})
function placeSBHorizontal(num) {
    if (scoutPlaced == false) {
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
                let row = i
                let column = j
                try {
                if (scoutPlaced == false && pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row][column + 1].id != "playership") {
                    pboard[row][column].setAttribute("id", "playership")
                    pboard[row][column + 1].setAttribute("id", "playership")
                    pboard[row][column].classList.add("class", "pSB")
                    pboard[row][column + 1].classList.add("class", "pSB")
                    scoutPlaced = true
                }
            } 
            catch(err) {
                alert("You can't place your scout boat there")

            }
        }
    } 
}
    else if (scoutPlaced == true) {
        alert("You've already placed your scout boat.")
    } else {
        alert("you can't place it there.")
    }
}
scoutPlayerV.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputSB').value;
    placeSBVertical(textInput)
    document.querySelector('#inputSB').value = ""
})
function placeSBVertical(num) {
    if (scoutPlaced == false) {
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row + 1][column].id != "playership") {
                        pboard[row][column].setAttribute("id", "playership")
                        pboard[row + 1][column].setAttribute("id", "playership")
                        pboard[row][column].classList.add("class", "pSB")
                        pboard[row + 1][column].classList.add("class", "pSB")
                        scoutPlaced = true
                    }
                }
                catch (err) {
                    alert("You can't place your scout boat there.")
                }
            }
        }
    } else if (scoutPlaced == true) {
        alert("You've already placed your scout boat.")
    } else {
        alert("you can't place it there.")
    }
}

//Battleship Placement
BSPlayerH.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputBS').value;
    placeBSHorizontal(textInput)
    document.querySelector('#inputBS').value = ""

})
function placeBSHorizontal(num) {
    if (BSPlaced == false) {
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (BSPlaced == false && pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row][column + 1].id != "playership" && pboard[row][column + 2].id != "playership" && pboard[row][column + 3].id != "playership") {
                        pboard[row][column].setAttribute("id", "playership")
                        pboard[row][column + 1].setAttribute("id", "playership")
                        pboard[row][column + 2].setAttribute("id", "playership")
                        pboard[row][column + 3].setAttribute("id", "playership")
                        pboard[row][column].classList.add("class", "pBS")
                        pboard[row][column + 1].classList.add("class", "pBS")
                        pboard[row][column + 2].classList.add("class", "pBS")
                        pboard[row][column + 3].classList.add("class", "pBS")
                        BSPlaced = true
                    }
                }
                catch (err) {
                    alert("You can't place your battleship there")

                }
            }
        }
    }
    else if (scoutPlaced == true) {
        alert("You've already placed your battleship.")
    } else {
        alert("you can't place it there.")
    }
}
BSPlayerV.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputBS').value;
    placeBSVertical(textInput)
    document.querySelector('#inputBS').value = ""
})
function placeBSVertical(num) {
    if (BSPlaced == false) {
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row + 1][column].id != "playership" && pboard[row + 2][column].id != "playership" && pboard[row + 3][column].id != "playership") {
                        pboard[row][column].setAttribute("id", "playership")
                        pboard[row + 1][column].setAttribute("id", "playership")
                        pboard[row + 2][column].setAttribute("id", "playership")
                        pboard[row + 3][column].setAttribute("id", "playership")
                        pboard[row][column].classList.add("class", "pBS")
                        pboard[row + 1][column].classList.add("class", "pBS")
                        pboard[row + 2][column].classList.add("class", "pBS")
                        pboard[row + 3][column].classList.add("class", "pBS")
                        BSPlaced = true
                    }
                }
                catch (err) {
                    alert("You can't place your battleship there.")
                }
            }
        }
    } else if (scoutPlaced == true) {
        alert("You've already placed your battleship.")
    } else {
        alert("you can't place it there.")
    }
}

//Aircraft Carrier Placement
ACPlayerH.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputAC').value;
    placeACHorizontal(textInput)
    document.querySelector('#inputAC').value = ""

})
function placeACHorizontal(num) {
    if (ACPlaced == false) {
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (ACPlaced == false && pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row][column + 1].id != "playership" && pboard[row][column + 2].id != "playership" && pboard[row][column + 3].id != "playership" && pboard[row][column + 4].id != "playership") {
                        pboard[row][column].setAttribute("id", "playership")
                        pboard[row][column + 1].setAttribute("id", "playership")
                        pboard[row][column + 2].setAttribute("id", "playership")
                        pboard[row][column + 3].setAttribute("id", "playership")
                        pboard[row][column + 4].setAttribute("id", "playership")
                        pboard[row][column].classList.add("class", "pAC")
                        pboard[row][column + 1].classList.add("class", "pAC")
                        pboard[row][column + 2].classList.add("class", "pAC")
                        pboard[row][column + 3].classList.add("class", "pAC")
                        pboard[row][column + 4].classList.add("class", "pAC")
                        ACPlaced = true
                    }
                }
                catch (err) {
                    alert("You can't place your aircraft carrier there")

                }
            }
        }
    }
    else if (ACPlaced == true) {
        alert("You've already placed your aircraft carrier.")
    } else {
        alert("you can't place it there.")
    }
}
ACPlayerV.addEventListener("click", event => {
    event.preventDefault()
    let textInput = document.querySelector('#inputAC').value;
    placeACVertical(textInput)
    document.querySelector('#inputAC').value = ""
})
function placeACVertical(num) {
    if (ACPlaced == false) {
        for (let i = 0; i < pboard.length; i++) {
            for (let j = 0; j < pboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (pboard[row][column].innerText == String(num) && pboard[row][column].id != "playership" && pboard[row + 1][column].id != "playership" && pboard[row + 2][column].id != "playership" && pboard[row + 3][column].id != "playership" && pboard[row + 4][column].id != "playership") {
                        pboard[row][column].setAttribute("id", "playership")
                        pboard[row + 1][column].setAttribute("id", "playership")
                        pboard[row + 2][column].setAttribute("id", "playership")
                        pboard[row + 3][column].setAttribute("id", "playership")
                        pboard[row + 4][column].setAttribute("id", "playership")
                        pboard[row][column].classList.add("class", "pAC")
                        pboard[row + 1][column].classList.add("class", "pAC")
                        pboard[row + 2][column].classList.add("class", "pAC")
                        pboard[row + 3][column].classList.add("class", "pAC")
                        pboard[row + 4][column].classList.add("class", "pAC")
                        ACPlaced = true
                    }                   
                }
                catch (err) {
                    alert("You can't place your aircraft carrier there.")
                }
            }
        }
    } else if (scoutPlaced == true) {
        alert("You've already placed your aircraft carrier.")
    } else {
        alert("you can't place it there.")
    }
}


//computer ship placement
let cSBset = false
let cSubset = false
let cBSset = false
let cACset = false
let cSBlife = 2
let cSublife = 3
let cBSlife = 4
let cAClife = 5
function setComputerSB(){
    let test = Math.floor(Math.random() * 64)
    let axis = Math.floor(Math.random() * 2)
    if (axis == 1){
    for (let i = 0; i < cboard.length; i++) {
        for (let j = 0; j < cboard[i].length; j++) {
            let row = i
            let column = j
            try {if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row + 1][column].id != "ship"){
                cboard[row][column].setAttribute("id", "ship")
                cboard[row + 1][column].setAttribute("id", "ship")
                cboard[row][column].classList.add("class", "cSB")
                cboard[row + 1][column].classList.add("class", "cSB")
                cSBset = true
            } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship")) {
                setComputerSB()
            }}
            catch(err) {
                setComputerSB()
            }
        }
    }} else {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row][column + 1].id != "ship") {
                    cboard[row][column].setAttribute("id", "ship")
                    cboard[row][column + 1].setAttribute("id", "ship")
                    cboard[row][column].classList.add("class", "cSB")
                    cboard[row][column + 1].classList.add("class", "cSB")
                    cSBset = true
                } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship")) {
                    setComputerSB()
                }}
                catch(err){
                    setComputerSB()
                }
            }
        }
    } 
}
function setComputerSub() {
    let test = Math.floor(Math.random() * 64)
    let axis = Math.floor(Math.random() * 2)
    if (axis == 1) {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row + 1][column].id != "ship" && cboard[row + 2][column].id != "ship") {
                        cboard[row][column].setAttribute("id", "ship")
                        cboard[row + 1][column].setAttribute("id", "ship")
                        cboard[row + 2][column].setAttribute("id", "ship")
                        cboard[row][column].classList.add("class", "cSub")
                        cboard[row + 1][column].classList.add("class", "cSub")
                        cboard[row + 2][column].classList.add("class", "cSub")
                        cSubset = true
                    } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship" || cboard[row + 2][column].id == "ship")) {
                        setComputerSub()
                    }
                }
                catch (err) {
                    setComputerSub()
                }
            }
        }
    } else {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row][column + 1].id != "ship" && cboard[row][column + 2].id != "ship") {
                        cboard[row][column].setAttribute("id", "ship")
                        cboard[row][column + 1].setAttribute("id", "ship")
                        cboard[row][column + 2].setAttribute("id", "ship")
                        cboard[row][column].classList.add("class", "cSub")
                        cboard[row][column + 1].classList.add("class", "cSub")
                        cboard[row][column + 2].classList.add("class", "cSub")
                        cSubset = true
                    } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship" || cboard[row + 2][column].id == "ship")) {
                        setComputerSub()
                    }
                }
                catch (err) {
                    setComputerSub()
                }
            }
        }
    }
}
function setComputerBS() {
    let test = Math.floor(Math.random() * 64)
    let axis = Math.floor(Math.random() * 2)
    if (axis == 1) {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row + 1][column].id != "ship" && cboard[row + 2][column].id != "ship" && cboard[row + 3][column].id != "ship") {
                        cboard[row][column].setAttribute("id", "ship")
                        cboard[row + 1][column].setAttribute("id", "ship")
                        cboard[row + 2][column].setAttribute("id", "ship")
                        cboard[row + 3][column].setAttribute("id", "ship")
                        cboard[row][column].classList.add("class", "cBS")
                        cboard[row + 1][column].classList.add("class", "cBS")
                        cboard[row + 2][column].classList.add("class", "cBS")
                        cboard[row + 3][column].classList.add("class", "cBS")
                        cBSset = true
                    } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship" || cboard[row + 2][column].id == "ship" || cboard[row + 3][column].id == "ship")) {
                        setComputerBS()
                    }
                }
                catch (err) {
                    setComputerBS()
                }
            }
        }
    } else {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row][column + 1].id != "ship" && cboard[row][column + 2].id != "ship" && cboard[row][column + 3].id != "ship") {
                        cboard[row][column].setAttribute("id", "ship")
                        cboard[row][column + 1].setAttribute("id", "ship")
                        cboard[row][column + 2].setAttribute("id", "ship")
                        cboard[row][column + 3].setAttribute("id", "ship")
                        cboard[row][column].classList.add("class", "cBS")
                        cboard[row][column + 1].classList.add("class", "cBS")
                        cboard[row][column + 2].classList.add("class", "cBS")
                        cboard[row][column + 3].classList.add("class", "cBS")
                        cBSset = true
                    } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship" || cboard[row + 2][column].id == "ship" || cboard[row + 3][column].id == "ship")) {
                        setComputerBS()
                    }
                }
                catch (err) {
                    setComputerBS()
                }
            }
        }
    }
}
function setComputerAC() {
    let test = Math.floor(Math.random() * 64)
    let axis = Math.floor(Math.random() * 2)
    if (axis == 1) {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row + 1][column].id != "ship" && cboard[row + 2][column].id != "ship" && cboard[row + 3][column].id != "ship" && cboard[row + 4][column].id != "ship") {
                        cboard[row][column].setAttribute("id", "ship")
                        cboard[row + 1][column].setAttribute("id", "ship")
                        cboard[row + 2][column].setAttribute("id", "ship")
                        cboard[row + 3][column].setAttribute("id", "ship")
                        cboard[row + 4][column].setAttribute("id", "ship")
                        cboard[row][column].classList.add("class", "cAC")
                        cboard[row + 1][column].classList.add("class", "cAC")
                        cboard[row + 2][column].classList.add("class", "cAC")
                        cboard[row + 3][column].classList.add("class", "cAC")
                        cboard[row + 4][column].classList.add("class", "cAC")
                        cACset = true
                    } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship" || cboard[row + 2][column].id == "ship" || cboard[row + 3][column].id == "ship" || cboard[row + 4][column].id == "ship")) {
                        setComputerAC()
                    }
                }
                catch (err) {
                    setComputerAC()
                }
            }
        }
    } else {
        for (let i = 0; i < cboard.length; i++) {
            for (let j = 0; j < cboard[i].length; j++) {
                let row = i
                let column = j
                try {
                    if (cboard[row][column].innerText == String(test) && cboard[row][column].id != "ship" && cboard[row][column + 1].id != "ship" && cboard[row][column + 2].id != "ship" && cboard[row][column + 3].id != "ship" && cboard[row][column + 4].id != "ship") {
                        cboard[row][column].setAttribute("id", "ship")
                        cboard[row][column + 1].setAttribute("id", "ship")
                        cboard[row][column + 2].setAttribute("id", "ship")
                        cboard[row][column + 3].setAttribute("id", "ship")
                        cboard[row][column + 4].setAttribute("id", "ship")
                        cboard[row][column].classList.add("class", "cAC")
                        cboard[row][column + 1].classList.add("class", "cAC")
                        cboard[row][column + 2].classList.add("class", "cAC")
                        cboard[row][column + 3].classList.add("class", "cAC")
                        cboard[row][column + 4].classList.add("class", "cAC")
                        cACset = true
                    } else if (cboard[row][column].innerText == String(test) && (cboard[row][column].id == "ship" || cboard[row + 1][column].id == "ship" || cboard[row + 2][column].id == "ship" || cboard[row + 3][column].id == "ship" || cboard[row + 4][column].id == "ship")) {
                        setComputerAC()
                    }
                }
                catch (err) {
                    setComputerAC()
                }
            }
        }
    }
}



