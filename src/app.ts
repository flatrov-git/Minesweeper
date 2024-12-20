"use strict"

let $ = document

let size: number = 10
let levelGameOption: string = "easy"
let numberOfBombs: number = 10

let handlerLevelGameOption = $.getElementById("level-game") as HTMLSelectElement

handlerLevelGameOption.addEventListener('change', (data: Event) => {
    levelGameOption = handlerLevelGameOption.value
})

switch (levelGameOption) {
    case "easy":
        numberOfBombs = 10
        break
    case "medium":
        numberOfBombs = 35
        break
    case "hard":
        numberOfBombs = 50
        break
    default:
        numberOfBombs = 10
        break
}

function createBoardGame() {
    let column = Array(size).fill(null).map(_ => Array(size).fill(false))

    for (let i = 0; numberOfBombs > i; i++) {
        let randNumberX: number = Math.round(Math.random() * (size - 1))
        let randNumberY: number = Math.round(Math.random() * (size - 1))

        if(!column[randNumberX][randNumberY])
            column[randNumberX][randNumberY] = true
        else
            i--
    }

    return column
}

console.log(createBoardGame())