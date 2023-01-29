const gameBoard = (function () {
  let state = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function render() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let content = state[i][j];
        domCache.drawCell(i, j, content);
      }
    }
    // domCache.setListeners();
  }

  function checkWinner() {
    domCache.declareWinner(players.activePlayer.name);
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
  let messages = document.querySelector(".header");
  const cells = document.querySelectorAll(".cell");

  function drawCell(row, col, content) {
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.setAttribute("data-row", `${row}`);
    newCell.setAttribute("data-col", `${col}`);
    newCell.textContent = content;
    newCell.addEventListener("click", handleMove);
    board.appendChild(newCell);
  }

  function declareWinner(name) {
    messages.textContent = name;
  }

  function clearBoard() {
    cells.forEach((element) => element.removeEventListener("click", handleMove));
    cells.forEach((element) => element.remove());
  }

  // function setListeners() {
  //   cells.forEach((element) => element.addEventListener("click", handleMove));
  // }

  function handleMove(event) {
    let row = parseInt(event.target.getAttribute("data-row"));
    let col = parseInt(event.target.getAttribute("data-col"));
    console.log(row, col);
    players.activePlayer.makeMove(row, col);
  }

  return {
    drawCell,
    clearBoard,
    declareWinner,
    // setListeners,
  };
})();

const players = (function () {
  const makePlayer = (name, token, type) => {
    function makeMove(row, col) {
      gameBoard.tryMove(row, col, token);
      console.log("im trying to make a move");
    }

    return {
      name,
      token,
      type,
      makeMove,
    };
  };
  let player1 = makePlayer("Michael", "x", "player");
  let player2 = makePlayer("Hannah", "O", "player");
  let players = [player1, player2];
  let activePlayer = players[1];

  function endTurn() {
    //switch players through array.
    //only works with 2 players
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
  }

  return {
    activePlayer,
    endTurn,
  };
})();

gameBoard.render();
