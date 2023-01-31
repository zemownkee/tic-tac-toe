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
    domCache.init();
  }

  function isWinningMove() {
    //check rows
    for (let i = 0; i < 3; i++) {
      if (
        state[i][0] != "" &&
        state[i][0] === state[i][1] &&
        state[i][0] === state[i][2]
      ) {
        return true;
      }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      if (
        state[0][i] != "" &&
        state[0][i] === state[1][i] &&
        state[0][i] === state[2][i]
      ) {
        return true;
      }
    }

    //check top-left to bottom right diagonal
    if (
      state[0][0] != "" &&
      state[0][0] === state[1][1] &&
      state[0][0] === state[2][2]
    ) {
      return true;
    }

    //check top-right to bottom left diagonal
    if (
      state[0][2] != "" &&
      state[0][2] === state[1][1] &&
      state[0][2] === state[2][0]
    ) {
      return true;
    }
  }

  function tryMove(row, col, token) {
    console.log("tryMove start");
    if (state[row][col] === "") {
      state[row][col] = token;
      domCache.clearBoard();
      render();
      if (isWinningMove()) {
        domCache.declareWinner(players.getActivePlayer().name);
      }
    }
    players.endTurn();
  }

  return {
    render,
    tryMove,
  };
})();

const domCache = (function () {
  let board = document.querySelector(".gameboard");
  let messages = document.querySelector(".header");
  let cells = [];

  function drawCell(row, col, content) {
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.setAttribute("data-row", `${row}`);
    newCell.setAttribute("data-col", `${col}`);
    newCell.textContent = content;
    board.appendChild(newCell);
  }

  function declareWinner(name) {
    messages.textContent = name;
  }

  function init() {
    cells = document.querySelectorAll(".cell");
    cells.forEach((element) => element.addEventListener("click", handleMove));
  }

  function clearBoard() {
    cells.forEach((element) =>
      element.removeEventListener("click", handleMove)
    );
    cells.forEach((element) => element.remove());
  }

  function handleMove(event) {
    let row = parseInt(event.target.getAttribute("data-row"));
    let col = parseInt(event.target.getAttribute("data-col"));
    players.getActivePlayer().makeMove(row, col);
  }

  return {
    init,
    drawCell,
    clearBoard,
    declareWinner,
  };
})();

const players = (function () {
  const makePlayer = (name, token, type) => {
    function makeMove(row, col) {
      gameBoard.tryMove(row, col, token);
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
  // let playerArray = [player1, player2];
  let activePlayer = player1;

  function endTurn() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else activePlayer = player1;
    console.log("end turn run");
    console.log(activePlayer);
  }

  function getActivePlayer() {
    return activePlayer;
  }

  return {
    endTurn,
    getActivePlayer,
  };
})();

gameBoard.render();
