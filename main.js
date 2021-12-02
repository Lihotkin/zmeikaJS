const gameState = {
  isGameActive = false,
  gameTimeToFrame = 300,
  blok = 20,
  dir = "stop",
  string = 20,
  snake = {
    head ={
      x: Math.floor(string / 2 - 1),
      y: Math.floor(blok / 2),
    },
    tail: [],
    MaxTail: blok * string
  },
  food = {
    x: Math.floor(Math.random() * string + 0),
    y: Math.floor(Math.random() * blok + 0)
  }
};


document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    main();
  }
});

function main() {
  // document.querySelector()


  const pageManager = {
    pages: {
      mainMenu: document.getElementById('mainMenu'),
      gameMenu: document.getElementById('gameMenu'),
      gamePage: document.getElementById('game-page')
    },
    openPage(name) {
      for (const [pageName, pageElement] of Object.entries(this.pages)) {
        if (pageName === name) pageElement.classList.remove('hidden');
        else pageElement.classList.add('hidden');
      }
    },
    openPages(names) {
      for (const [pageName, pageElement] of Object.entries(this.pages)) {
        if (names.includes(pageName)) pageElement.classList.remove('hidden');
        else pageElement.classList.add('hidden');
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    if ((e.code === 'KeyA' || e.keyCode == 37) && dir != "right") { dir = "left"; }
    else if ((e.code === 'KeyW' || e.keyCode == 38) && dir != "down") { dir = "up"; }
    else if ((e.code === 'KeyD' || e.keyCode == 39) && dir != "left") { dir = "right"; }
    else if ((e.code === 'KeyS' || e.keyCode == 40) && dir != "up") { dir = "down"; }
  });

  const playButtonElement = document.getElementById('play-btn');
  playButtonElement.addEventListener('click', () => {
    pageManager.openPage('gamePage');
    myMenus.clean();
    gameState.isGameActive = true;
    myGame.gameZone();
    setTimeout(myGame.game, gameState.gameTimeToFrame);
  });
  const escButtonElement = document.getElementById('esc-btn');
  escButtonElement.addEventListener('click', () => {
    pageManager.openPages(['gameMenu', 'gamePage']);
    gameState.isGameActive = false;
  });
  const rmButtonElement = document.getElementById('return-btn');
  rmButtonElement.addEventListener('click', () => {
    pageManager.openPage('mainMenu');
    gameState.isGameActive = true;
  });
  const ngButtonElement = document.getElementById('nw-btn');
  ngButtonElement.addEventListener('click', () => {
    pageManager.openPage('gamePage');
    myMenus.clean();
    gameState.isGameActive = true;
    myGame.gameZone();
    setTimeout(myGame.game, gameState.gameTimeToFrame);
  });
  const conButtonElement = document.getElementById('con-btn');
  conButtonElement.addEventListener('click', () => {
    pageManager.openPage('gamePage');
    gameState.isGameActive = true;
    setTimeout(myGame.game, gameState.gameTimeToFrame);
  });
}
let myGame = {
  game() {
    this.walls();
    this.action();
    this.eat();
    this.drawTail();
    this.checkWinCondition();
    if (isGameActive) setTimeout(this.game.bind(this), gameTimeToFrame);
  },
  gameZone() {
    var div = document.getElementById('areaGame');
    score = 0;
    dir = "stop";
    head = {
      x: Math.floor(string / 2 - 1),
      y: Math.floor(blok / 2),
      Tail: [],
      MaxTail: blok * string
    };
    food = {
      x: Math.floor(Math.random() * string + 0),
      y: Math.floor(Math.random() * blok + 0)
    };
    head.Tail.unshift({ x: head.x, y: head.y });
    for (var j = 0; j < blok; j++) {
      for (var i = 0; i < string; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = `${i} ${j}`;
        newDiv.classList.add('AreaBox')
        div.appendChild(newDiv);
      }
    }
    document.getElementById(`${head.x} ${head.y}`).classList.add('head');
    document.getElementById(`${food.x} ${food.y}`).classList.add('food');
  },
  action() {
    document.getElementById(`${food.x} ${food.y}`).classList.remove('food');
    if (dir === "left") { head.x--; }
    else if (dir === "right") { head.x++; }
    else if (dir === "up") { head.y--; }
    else if (dir === "down") { head.y++; }
    document.getElementById(`${food.x} ${food.y}`).classList.add('food');
    document.getElementById("result").innerHTML = score;
  },
  eat() {
    if (head.x == food.x && head.y == food.y) {
      document.getElementById(`${food.x} ${food.y}`).classList.remove('food');
      head.Tail.unshift({ x: head.x, y: head.y });
      score++;
      for (let i = 0; i < head.Tail.length; i++) {
        while (food.x === head.Tail[i].x && food.y === head.Tail[i].y) {
          food = {
            x: Math.floor(Math.random() * string + 0),
            y: Math.floor(Math.random() * blok + 0)
          };
        }
      }
    }
    else {
      head.Tail.pop();
      head.Tail.unshift({ x: head.x, y: head.y });
    }
  },
  tail() {
    if (head.Tail[0].x >= 0 && head.Tail[0].x < string && head.Tail[0].y >= 0 && head.Tail[0].y < blok) {
      for (let j = 0; j < blok; j++) {
        for (let i = 0; i < string; i++) {
          document.getElementById(`${i} ${j}`).classList.remove('tail');
          document.getElementById(`${i} ${j}`).classList.remove('head');
        }
      }
      for (let i = 0; i < head.Tail.length; i++) {
        if (i == 0) {
          document.getElementById(`${head.Tail[i].x} ${head.Tail[i].y}`).classList.add('head');
        }
        else {
          document.getElementById(`${head.Tail[i].x} ${head.Tail[i].y}`).classList.add('tail');
        }
      }
      for (let i = 1; i < head.Tail.length; i++) {
        if (head.Tail[0].x == head.Tail[i].x && head.Tail[0].y == head.Tail[i].y) {
          isGameActive = false;
          score = "Dead";
          document.getElementById("result").innerHTML = score;
        }
      }
    }
  },
  walls() {
    if ((head.x === 0 && dir === "left") || (head.x === string - 1 && dir === "right") ||
      (head.y === blok - 1 && dir === "down") || (head.y === 0 && dir === "up")) {
      isGameActive = false;
      score = "Dead";
      document.getElementById("result").innerHTML = score;
    }
  },
  checkWinCondition() {
    if (head.Tail.length === head.MaxTail) {
      isGameActive = false;
      score = "You WIN";
      document.getElementById("result").innerHTML = score;
    }
  }
}
const myMenus = {
  clean() {
    const myNode = document.getElementById("areaGame");
    myNode.innerHTML = '';
  }
}

