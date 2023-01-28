// temp file for storing code snippets
//module for gameBoard

const gameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let currentPlayer = null;

  function checkWinner() {
    //for loop just use i/j as indexing values, loop through rows, columns, etc
  }

  function checkValid(row, column) {
    if (gameBoard[row][column] == "") {
      gameBoard[row][column] = currentPlayer.token;
    }
  }

  function render() {}

  return { checkValid };
})();

//factory function for players
const makePlayer = (name, type, token) => {
  return {
    name,
    type,
    token,
  };
};

//Module for all DOM interaction 
const domCache = (function () {
  let cells = document.querySelectorAll(".cell");
  console.log(cells);
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick.bind(cell)));

  function handleCellClick(element) {
    let cellRow = parseInt(element.getAttribute("data-row"));
    let cellCol = parseInt(element.getAttribute("data-col"));

    gameBoard.checkValid(cellRow, cellCol);
  }


  let newRow = document.createElement('div');
  newRow.classList.add

  function 
})();