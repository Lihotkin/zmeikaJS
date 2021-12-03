const gameState = {
  isGameActive : false,
  isDeadWalls: true,
  gameTimeToFrame : 300,
  string: 20,
  blok: 20,
  score: 0,
  bestScore: 0,
  dir: "stop",
  snake: {
    tail: [],
    head : {
      x: Math.floor(this.string / 2 - 1),
      y: Math.floor(this.blok / 2)
    },
    maxTail: this.blok * this.string,
    food : {
      x: Math.floor(Math.random() * this.string + 0),
      y: Math.floor(Math.random() * this.blok + 0)
    }
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
      gamePage: document.getElementById('game-page'),
      settingPage: document.getElementById('settingPage')
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
  const areaManager = {
    area: document.getElementById('areaGame'),
    newSize(size) {
      if (size === 'areaLight'){
        this.area.classList.remove('areaMax');
        this.area.classList.remove('areaMedium');
        this.area.classList.add('areaLight');
      } 
      else if( size === 'areaMedium'){
        this.area.classList.remove('areaMax');
        this.area.classList.remove('areaLight');
        this.area.classList.add('areaMedium');
      }
      else if (size === 'areaMax'){
        this.area.classList.remove('areaMedium');
        this.area.classList.remove('areaLight');
        this.area.classList.add('areaMax');
      }
    }
  } 
  document.addEventListener("keydown", (e) => {
    if ((e.code === 'KeyA' || e.keyCode == 37) && 
    (gameState.dir != "right" || gameState.snake.tail.length === 1)) gameState.dir = "left";
    else if ((e.code === 'KeyW' || e.keyCode == 38) && 
    (gameState.dir != "down" || gameState.snake.tail.length === 1 )) gameState.dir = "up";
    else if ((e.code === 'KeyD' || e.keyCode == 39) &&
    (gameState.dir != "left" || gameState.snake.tail.length === 1)) gameState.dir = "right";
    else if ((e.code === 'KeyS' || e.keyCode == 40) && 
    (gameState.dir != "up" || gameState.snake.tail.length === 1)) gameState.dir = "down";
    else if (e.keyCode === 27) {
      pageManager.openPages(['gameMenu', 'gamePage']);
      gameState.isGameActive = false;
    }
  });

  const playButtonElement = document.getElementById('play-btn');
  playButtonElement.addEventListener('click', () => {
    pageManager.openPage('gamePage');
    myGame.cleanGameState();
    myMenus.cleanGameZone();
    gameState.isGameActive = true;
    myGame.gameZone();
    setTimeout(myGame.game, gameState.gameTimeToFrame);
  });
  const exitButtonElement = document.getElementById('ext-btn');
  exitButtonElement.addEventListener('click', () => {
    close();
  });
  const escButtonElement = document.getElementById('esc-btn');
  escButtonElement.addEventListener('click', () => {
    pageManager.openPages(['gameMenu', 'gamePage']);
    gameState.isGameActive = false;
  });
  const rmButtonElement = document.getElementById('return-btn');
  rmButtonElement.addEventListener('click', () => {
    pageManager.openPage('mainMenu');
    gameState.isGameActive = false;
  });
  const ngButtonElement = document.getElementById('nw-btn');
  ngButtonElement.addEventListener('click', () => {
    pageManager.openPage('gamePage');
    myGame.cleanGameState();
    myMenus.cleanGameZone();
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
  const setButtonElement = document.getElementById('setting-btn');
  setButtonElement.addEventListener('click', () => {
    pageManager.openPage('settingPage');
  });
  const hardButtonElement = document.getElementById('settingHard-btn');
  hardButtonElement.addEventListener('click', () => {
    gameState.gameTimeToFrame = 70;
  });
  const mediumButtonElement = document.getElementById('settingMedium-btn');
  mediumButtonElement.addEventListener('click', () => {
    gameState.gameTimeToFrame = 100;
  });
  const lightButtonElement = document.getElementById('settingLight-btn');
  lightButtonElement.addEventListener('click', () => {
    gameState.gameTimeToFrame = 300;
  });
  const returnSetButtonElement = document.getElementById('returnSet-btn');
  returnSetButtonElement.addEventListener('click', () => {
    pageManager.openPage('mainMenu');
    gameState.isGameActive = false;
  });
  const setSizeLButtonElement = document.getElementById('setSizeL-btn');
  setSizeLButtonElement.addEventListener('click', () =>{
    areaManager.newSize('areaLight');
    gameState.blok = 20;
    gameState.string = 20;
  });
  const setSizeMButtonElement = document.getElementById('setSizeM-btn');
  setSizeMButtonElement.addEventListener('click', () =>{
    areaManager.newSize('areaMedium');
    gameState.blok = 30;
    gameState.string = 30;
  });
  const setSizeMaxButtonElement = document.getElementById('setSizeMax-btn');
  setSizeMaxButtonElement.addEventListener('click', () =>{
    areaManager.newSize('areaMax');
    gameState.blok = 40;
    gameState.string = 40;
  });
  const redactWallsDWButtonElement = document.getElementById('redactorWallsDW');
  redactWallsDWButtonElement.addEventListener('click', () => {
    document.getElementById('redactorWallsDW').classList.add('hidden');
    document.getElementById('redactorWallsTW').classList.remove('hidden');
    gameState.isDeadWalls = false;
  });
  const redactWallsTWButtonElement = document.getElementById('redactorWallsTW');
  redactWallsTWButtonElement.addEventListener('click', () => {
    document.getElementById('redactorWallsDW').classList.remove('hidden');
    document.getElementById('redactorWallsTW').classList.add('hidden');
    gameState.isDeadWalls = true;
  });
}
let myGame = {
  game () {
    myGame.drawWallsCondition();
    myGame.action();
    myGame.eat();
    myGame.drawTailCondition();
    myGame.checkWinCondition();
    // if (gameState.isGameActive) setTimeout(this.game.bind(this), gameState.gameTimeToFrame);
    if (gameState.isGameActive) setTimeout(myGame.game, gameState.gameTimeToFrame);
  },
  drawWallsCondition () {
    if (gameState.isDeadWalls){
      if ((gameState.snake.head.x === 0 && gameState.dir === "left") ||
        (gameState.snake.head.x === gameState.string - 1 && gameState.dir === "right") ||
        (gameState.snake.head.y === gameState.blok - 1 && gameState.dir === "down") || 
        (gameState.snake.head.y === 0 && gameState.dir === "up")) {
        gameState.isGameActive = false;
        if (gameState.bestScore < gameState.score) gameState.bestScore = gameState.score;
        document.getElementById("result").innerHTML = gameState.score;
        document.getElementById("result2").innerHTML = gameState.bestScore;
      }
    }
      else if (!gameState.isDeadWalls){
        if (gameState.snake.tail[0].x === 0 && gameState.dir === "left") {
          gameState.snake.head.x = gameState.string;
        } 
        else if (gameState.snake.tail[0].x  === gameState.string - 1 && gameState.dir === "right"){
          gameState.snake.head.x = -1;
        }
        else if (gameState.snake.tail[0].y === 0 && gameState.dir === "up" ){
          gameState.snake.head.y = gameState.blok;
        } 
        else if (gameState.snake.tail[0].y === gameState.blok - 1  && gameState.dir === "down") {
          gameState.snake.head.y = -1;
        }
    }
  },
  gameZone() {
    var div = document.getElementById('areaGame');
    gameState.score = 0;
    gameState.dir = "stop";
    gameState.snake.head = {
      x: Math.floor(gameState.string / 2 - 1),
      y: Math.floor(gameState.blok / 2),
      tail: [],
      maxTail: gameState.blok * gameState.string
    };
    gameState.snake.food = {
      x: Math.floor(Math.random() * gameState.string + 0),
      y: Math.floor(Math.random() * gameState.blok + 0)
    };
    gameState.snake.tail.unshift({ x: gameState.snake.head.x, y: gameState.snake.head.y });
    for (var j = 0; j < gameState.blok; j++) {
      for (var i = 0; i < gameState.string; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = `${i} ${j}`;
        newDiv.classList.add('AreaBox')
        div.appendChild(newDiv);
      }
    }
    document.getElementById(`${gameState.snake.head.x} ${gameState.snake.head.y}`).classList.add('head');
    document.getElementById(`${gameState.snake.food.x} ${gameState.snake.food.y}`).classList.add('food');
  },
  action() {
    document.getElementById(`${gameState.snake.food.x} ${gameState.snake.food.y}`).classList.remove('food');
    if (gameState.dir === "left") gameState.snake.head.x--;
    else if (gameState.dir === "right") gameState.snake.head.x++;
    else if (gameState.dir === "up") gameState.snake.head.y--;
    else if (gameState.dir === "down") gameState.snake.head.y++;
    document.getElementById(`${gameState.snake.food.x} ${gameState.snake.food.y}`).classList.add('food');
    document.getElementById("result").innerHTML = gameState.score;
  },
  eat() {
    if (gameState.snake.head.x == gameState.snake.food.x && 
      gameState.snake.head.y == gameState.snake.food.y) {
      document.getElementById(`${gameState.snake.food.x} ${gameState.snake.food.y}`).classList.remove('food');
      gameState.snake.tail.unshift({ x: gameState.snake.head.x, y: gameState.snake.head.y });
      gameState.score++;
      for (let i = 0; i < gameState.snake.tail.length; i++) {
        while (gameState.snake.food.x === gameState.snake.tail[i].x && 
          gameState.snake.food.y === gameState.snake.tail[i].y) {
            gameState.snake.food = {
            x: Math.floor(Math.random() * gameState.string + 0),
            y: Math.floor(Math.random() * gameState.blok + 0)
          };
        }
      }
    }
    else {
      gameState.snake.tail.pop();
      gameState.snake.tail.unshift({ x: gameState.snake.head.x, y: gameState.snake.head.y });
    }
  },
  drawTailCondition() {
      if (gameState.snake.tail[0].x >= 0 && gameState.snake.tail[0].x < gameState.string &&
        gameState.snake.tail[0].y >= 0 && gameState.snake.tail[0].y < gameState.blok) {
        for (let j = 0; j < gameState.blok; j++) {
          for (let i = 0; i < gameState.string; i++) {
            document.getElementById(`${i} ${j}`).classList.remove('tail');
            document.getElementById(`${i} ${j}`).classList.remove('head');
          }
        }
        for (let i = 0; i < gameState.snake.tail.length; i++) {
          if (i == 0) {
            document.getElementById(`${gameState.snake.tail[i].x} ${gameState.snake.tail[i].y}`).classList.add('head');
          }
          else {
            document.getElementById(`${gameState.snake.tail[i].x} ${gameState.snake.tail[i].y}`).classList.add('tail');
          }
        }
        for (let i = 1; i < gameState.snake.tail.length; i++) {
          if (gameState.snake.tail[0].x == gameState.snake.tail[i].x &&
            gameState.snake.tail[0].y == gameState.snake.tail[i].y) {
            gameState.isGameActive = false;
            if (gameState.bestScore < gameState.score) gameState.bestScore = gameState.score;
            document.getElementById("result").innerHTML = gameState.score;
            document.getElementById("result2").innerHTML = gameState.bestScore;
          }
        }
      }
  },
  checkWinCondition() {
    if (gameState.snake.tail.length === gameState.snake.maxTail) {
      gameState.isGameActive = false;
      gameState.score = "You WIN";
      if (gameState.bestScore < gameState.score) gameState.bestScore = gameState.score;
      document.getElementById("result").innerHTML = gameState.score;
      document.getElementById("result2").innerHTML = gameState.bestScore;
    }
  },
  cleanGameState (){
    gameState.dir = "stop";
    gameState.score = 0;
    gameState.snake.tail = [];
  }
}
const myMenus = {
  cleanGameZone() {
    const myNode = document.getElementById("areaGame");
    myNode.innerHTML = '';
  }
}

