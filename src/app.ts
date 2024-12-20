"use strict"

let $ = document
let root = $.getElementById("root") as HTMLDivElement

let size: number = 10
let levelGameOption: string = "easy"
let numberOfBombs: number = 25

let handlerLevelGameOption = $.getElementById("level-game") as HTMLSelectElement

handlerLevelGameOption.addEventListener('change', (data: Event) => {
    levelGameOption = handlerLevelGameOption.value
    showBoardGame()
})

function createMainBoardGame() {
    switch (levelGameOption) {
        case "easy":
            numberOfBombs = 25
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

    let mainBoardGame: boolean[][] = Array(size).fill(null).map(_ => Array(size).fill(false))

    for (let i = 0; numberOfBombs > i; i++) {
        let randNumberX: number = Math.round(Math.random() * (size - 1))
        let randNumberY: number = Math.round(Math.random() * (size - 1))

        if (!mainBoardGame[randNumberX][randNumberY])
            mainBoardGame[randNumberX][randNumberY] = true
        else
            i--
    }

    return mainBoardGame
}


function createFrontBoardGame() {
    let frontBoardGame: string[][] = Array(size).fill(null).map(_ => Array(size).fill("*"))
    let mainBoardGame: boolean[][] = createMainBoardGame()

    for (let i = 0; size > i; i++) {
        for (let j = 0; size > j; j++) {
            if (mainBoardGame[i][j])
                frontBoardGame[i][j] = "#"
            else
                frontBoardGame[i][j] = numberOfBombsPerHouse(i, j, mainBoardGame)
        }
    }

    return frontBoardGame
}

function numberOfBombsPerHouse(i: number, j: number, mainBoardGame: boolean[][]): string {
    let bombs = 0;

    for (let x = -1; 1 >= x; ++x) {
        for (let y = -1; 1 >= y; ++y) {
            let nx = i + x
            let ny = j + y

            if(nx >= 0 && ny >= 0 && nx < size && ny < size && mainBoardGame[nx][ny]){
                bombs++
            }
        }
    }

    if (bombs)
        return String(bombs)
    else
        return " ";
}

function showBoardGame() {
    root.innerText = ""

    createFrontBoardGame().forEach(row => {
        row.forEach(column => {
            let divElem = $.createElement("div")
            divElem.className = "square"
            divElem.onclick = () => {divElem.innerHTML = column}
            root.append(divElem)
        })
    })
}

showBoardGame()