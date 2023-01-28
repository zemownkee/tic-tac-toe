const gameBoard = (function () {
  let state = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let players = [];

  function render() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let content = state[i][j];
        domCache.drawCell(i, j, content);
      }
    }
  }

  function tryMove(row, col, token) {
    if (state[row][col] === "") {
      state[row][col] = token;
      domCache.clearBoard();
      render();
    }
  }

  return {
    render,
    tryMove,
  };
})();

const domCache = (function () {
  let board = document.querySelector(".gameboard");

  function drawCell(row, col, content) {
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.setAttribute("data-row", `${row}`);
    newCell.setAttribute("data-col", `${col}`);
    newCell.textContent = content;
    newCell.addEventListener;
    board.appendChild(newCell);
  }

  function clearBoard() {
    document.querySelectorAll(".cell").forEach((element) => element.removeEventListener("click"));
    document.querySelectorAll(".cell").forEach((element) => element.remove());
  }

  // function setListeners() {
  //   document
  //     .querySelectorAll(".cell")
  //     .forEach((element) => element.addEventListener("click", gameBoard.currentPlayer.tryMove));
  // }

  return {
    drawCell,
    clearBoard,
    setListeners,
  };
})();

// const makePlayer = (name, token, type) => {
//   return {
//     name,
//     token,
//     type,
//   };
// };
