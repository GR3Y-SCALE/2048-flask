let board;
let score = 0;
const rows = 4;
const columns = 4;
let looseGame = false;
let debugging = true;
let winner = false;
let highScore;

function btnState(condition) {
  button = document.getElementById("button");
  if (condition) {
    button.style.opacity = "1"
    button.style.cursor = "allowed"
  } else {
    button.style.opacity = "0.2"
    button.style.cursor = "not-allowed"
  }
}


window.onload = function() {
    setGame();
    highScore = getHighScore();
    btnState(false);
}

function setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    ranTileVal();
    ranTileVal();


}

function checkLooseGame() { //checks if there as any zeros, if not, then game is lost.
  if (!hasEmptyTile()) {
    looseGame = true;
  }
}


function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (!looseGame) {
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
        }
        else if (e.code == "ArrowRight") {
            slideRight();
            setTwo();
        }
        else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();

        }
        else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
        }
        document.getElementById("score").innerText = score;
        checkLooseGame();

    } else {
      endGame()
    }
})

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    //[0, 2, 2, 2]
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
          getScore(row[i],row[i+1]);
            row[i] *= 2;
            row[i+1] = 0;

        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}


function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function setFour() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "4";
            tile.classList.add("x4");
            found = true;
        }
    }
}

function ranTileVal() {
  let max = 4;
  let min = 1;
  if (Math.floor(Math.random() * (max - min + 1) + min) <= 2) {
    setTwo();
  }else {
    setFour();
  }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}


/*function sendScore(highScore) {
  //let stringedScore = String(highScore);
  let dict_values = {"highScore" : highScore}; //Passes js var to dictionary
  if (debugging) {console.log(dict_values)} //Will output if debugging enabled
  $.ajax({
    url:"/score",
    type:"POST",
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(dict_values)
  });
}
*/
function sendScore(highScore) {
  var dict_values = {highScore}; //Passes js var to dictionary
  var stringed = JSON.stringify(dict_values); //stringify converts js val to JSON
  if (debugging) {console.log(stringed)} //Will output if debugging enabled
  fetch("/score", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: stringed
  });
}

function getHighScore() {
  let highScore = document.getElementById("high-score").innerText;
  return highScore;
}

function setHighScore(value) {
  document.getElementById("highScore").innerText = value;
}

function checkHighestScore(highScore,score) {
  if (score > highScore) {
    return true;
  } else {
    return false;
  }
}


function databaseError(message) {
  const error = new Error(message);
  return error;
}
databaseError.prototype = Object.create(Error.prototype);


function confirmScoreUpdate() {
  let dbScore = getHighScore();
  if (!dbScore == score) {
    throw new databaseError('Database Connectivity Error')
  }
}

function getScore(firstTile, secondTile) {
  if (firstTile > 0 && secondTile > 0) {
    score = score + firstTile + secondTile;
  }
}

function syncScoreDB() {

}

function endGame(){
  if (checkHighestScore()) {
    winner = true

  }
}
