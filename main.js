const gameState = {
  isGameActive: false,
  isDeadWalls: true,
  isTimeFoods: true,
  isInteriorWalls: false,
  isMoveWalls: false,
  gameTimeToFrame: 100,
  areaSize: 20,
  score: 0,
  bestScore: 0,
  dir: "stop",
  lastDir: "stop",
  isGameResult: "You Lose",
  walls: {},
  foods: {
    nFoods: 4,
    _points: [],
    add(point) {
      this._points.push(point);
    },
    render() {
      for (const point of this._points) {
        if (point.z === 0) document.getElementById(`${point.x} ${point.y}`).classList.add('food');
        else if (point.z === 1) document.getElementById(`${point.x} ${point.y}`).classList.add('foodTime');
      }
    },
    clear() {
      for (const point of this._points) {
        document.getElementById(`${point.x} ${point.y}`).classList.remove('food');
        document.getElementById(`${point.x} ${point.y}`).classList.remove('foodTime');
      }
    },
    remove(point) {
      this._points = this._points.filter((foodPoint) => !(foodPoint.x === point.x && foodPoint.y === point.y));
    },
    deleteSpecialFoods() {
      for (const point of this._points) {
        if (point.z === 1) {
          if (point.t === 0) this.remove(point);
          else point.t--;
        }
      }
    }
  },
  snake: {
    tail: [],
    checkCollisions(point) {
      return this.tail.some(({ x, y }) => x === point.x && y === point.y);
    },
    head: {
      x: Math.floor(this.string / 2 - 1),
      y: Math.floor(this.blok / 2)
    },
    maxTail: this.blok * this.string,
    food: [],
    foodTurn: 2,
    clear() {
      for (let i = 0; i < gameState.snake.tail.length; i++) {
        if (i == 0) {
          document.getElementById(`${gameState.snake.tail[i].x} ${gameState.snake.tail[i].y}`).classList.remove('head');
        }
        else {
          document.getElementById(`${gameState.snake.tail[i].x} ${gameState.snake.tail[i].y}`).classList.remove('tail');
        }
      }
    },
    drawSnake() {
      gameState.lastDir = gameState.dir;
      for (let i = 0; i < gameState.snake.tail.length; i++) {
        if (i == 0) {
          document.getElementById(`${gameState.snake.tail[i].x} ${gameState.snake.tail[i].y}`).classList.add('head');
        }
        else {
          document.getElementById(`${gameState.snake.tail[i].x} ${gameState.snake.tail[i].y}`).classList.add('tail');
        }
      }
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
      settingPage: document.getElementById('settingPage'),
      statusPage: document.getElementById('statusPage'),
      helpPage: document.getElementById('helpPage')
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
      if (size === 'areaLight') {
        this.area.classList.remove('areaMax');
        this.area.classList.remove('areaMedium');
        this.area.classList.add('areaLight');
      }
      else if (size === 'areaMedium') {
        this.area.classList.remove('areaMax');
        this.area.classList.remove('areaLight');
        this.area.classList.add('areaMedium');
      }
      else if (size === 'areaMax') {
        this.area.classList.remove('areaMedium');
        this.area.classList.remove('areaLight');
        this.area.classList.add('areaMax');
      }
    }
  }
  document.addEventListener("keydown", (e) => {
    if ((e.code === 'KeyA' || e.keyCode == 37) &&
      (gameState.dir != "right" && gameState.lastDir != "right" || gameState.snake.tail.length === 1)) gameState.dir = "left";
    else if ((e.code === 'KeyW' || e.keyCode == 38) &&
      (gameState.dir != "down" && gameState.lastDir != "down" || gameState.snake.tail.length === 1)) gameState.dir = "up";
    else if ((e.code === 'KeyD' || e.keyCode == 39) &&
      (gameState.dir != "left" && gameState.lastDir != "left" || gameState.snake.tail.length === 1)) gameState.dir = "right";
    else if ((e.code === 'KeyS' || e.keyCode == 40) &&
      (gameState.dir != "up" && gameState.lastDir != "up" || gameState.snake.tail.length === 1)) gameState.dir = "down";
    else if (e.keyCode === 27 && gameState.isGameActive) {
      gameState.isPause = true;
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
    gameState.isPause = false;
    setTimeout(myGame.game, gameState.gameTimeToFrame);
  });
  const setButtonElement = document.getElementById('setting-btn');
  setButtonElement.addEventListener('click', () => {
    pageManager.openPage('settingPage');
  });
  const hardButtonElement = document.getElementById('settingSpeed-btn');
  hardButtonElement.addEventListener('click', () => {
    if (gameState.gameTimeToFrame === 300) {
      document.getElementById('settingSpeed-btn').innerText = 'Medium';
      gameState.gameTimeToFrame = 150;
    } else if (gameState.gameTimeToFrame === 150) {
      document.getElementById('settingSpeed-btn').innerText = 'Hard';
      gameState.gameTimeToFrame = 100;
    } else if (gameState.gameTimeToFrame === 100) {
      document.getElementById('settingSpeed-btn').innerText = 'Light';
      gameState.gameTimeToFrame = 300;
    }
  });
  const returnSetButtonElement = document.getElementById('returnSet-btn');
  returnSetButtonElement.addEventListener('click', () => {
    pageManager.openPage('mainMenu');
    gameState.isGameActive = false;
  });
  const setSizeLButtonElement = document.getElementById('settingSize-btn');
  setSizeLButtonElement.addEventListener('click', () => {
    if (gameState.areaSize === 20) {
      areaManager.newSize('areaMedium');
      gameState.areaSize = 30;
      document.getElementById('settingSize-btn').innerText = '30*30';
    } else if (gameState.areaSize === 30) {
      areaManager.newSize('areaMax');
      gameState.areaSize = 40;
      document.getElementById('settingSize-btn').innerText = '40*40';
    } else if (gameState.areaSize === 40) {
      areaManager.newSize('areaLight');
      gameState.areaSize = 20;
      document.getElementById('settingSize-btn').innerText = '20*20';
    }
  });
  const redactWallsDWButtonElement = document.getElementById('redactorWalls-btn');
  redactWallsDWButtonElement.addEventListener('click', () => {
    if (gameState.isDeadWalls) {
      gameState.isDeadWalls = false;
      document.getElementById('redactorWalls-btn').innerText = 'Teleport'
    }
    else {
      gameState.isDeadWalls = true;
      document.getElementById('redactorWalls-btn').innerText = 'Dead'
    }
  });
  const pageNWButtonElement = document.getElementById('pageNW-btn');
  pageNWButtonElement.addEventListener('click', () => {
    pageManager.openPage('gamePage');
    myGame.cleanGameState();
    myMenus.cleanGameZone();
    gameState.isGameActive = true;
    myGame.gameZone();
    setTimeout(myGame.game, gameState.gameTimeToFrame);
  });
  const pageMMenuButton = document.getElementById('pageMenu-btn');
  pageMMenuButton.addEventListener('click', () => {
    pageManager.openPage('mainMenu');
    gameState.isGameActive = false;
  });
  const interiorWallsButtonElement = document.getElementById('interiorWalls-btn');
  interiorWallsButtonElement.addEventListener('click', () => {
    if (gameState.isInteriorWalls && gameState.isMoveWalls) {
      gameState.isInteriorWalls = false;
      gameState.isMoveWalls = false;
      document.getElementById('interiorWalls-btn').innerText = 'Null';
    } else if (!gameState.isInteriorWalls && !gameState.isMoveWalls) {
      gameState.isInteriorWalls = true;
      document.getElementById('interiorWalls-btn').innerText = 'Static';
    } else {
      gameState.isMoveWalls = true;
      document.getElementById('interiorWalls-btn').innerText = 'Move';
    }
  });
  const helpButtonElement = document.getElementById('help-btn');
  helpButtonElement.addEventListener('click', () => {
    pageManager.openPage('helpPage');
  });
  const returnHelpButtonElement = document.getElementById('returnHelp-btn');
  returnHelpButtonElement.addEventListener('click', () => {
    pageManager.openPage('mainMenu');
  });
  const timeFoodButtonElement = document.getElementById('timeFood-btn');
  timeFoodButtonElement.addEventListener('click', () => {
    if (gameState.isTimeFoods) {
      gameState.isTimeFoods = false;
      document.getElementById('timeFood-btn').innerText = 'OFF'
    } else {
      gameState.isTimeFoods = true;
      document.getElementById('timeFood-btn').innerText = 'ON'
    }
  });
  const nFoodButtonElement = document.getElementById('nFoods-btn');
  nFoodButtonElement.addEventListener('click', () => {
    if (gameState.foods.nFoods > 0){
      document.getElementById('nFoods-btn').innerText = 'One';
      gameState.foods.nFoods = 0;
    }else{
      document.getElementById('nFoods-btn').innerText = 'Many';
      gameState.foods.nFoods = 4;
    }
  });

  let myGame = {
    game() {
      // clear
      gameState.foods.clear();
      gameState.snake.clear();
      myGame.clearInteriorWalls();
      if (gameState.isTimeFoods) gameState.foods.deleteSpecialFoods();
      // logic
      gameState.snake.foodTurn--;
      myGame.drawWallsCondition();
      myGame.wallMovement()
      myGame.action();
      myGame.eat();
      myGame.drawTailCondition();
      myGame.checkWinCondition();
      // render
      gameState.foods.render();
      gameState.snake.drawSnake();
      myGame.drawInteriorWalls();
      // repeat
      if (gameState.snake.foodTurn <= 0 && gameState.foods._points.length <= gameState.foods.nFoods) myGame.generateFood();
      if (gameState.isGameActive) setTimeout(myGame.game, gameState.gameTimeToFrame);
    },
    drawWallsCondition() {
      if (gameState.isDeadWalls) {
        if ((gameState.snake.head.x === 0 && gameState.dir === "left") ||
          (gameState.snake.head.x === gameState.areaSize - 1 && gameState.dir === "right") ||
          (gameState.snake.head.y === gameState.areaSize - 1 && gameState.dir === "down") ||
          (gameState.snake.head.y === 0 && gameState.dir === "up")) myGame.statusLose();
      }
      else if (!gameState.isDeadWalls) {
        if (gameState.snake.tail[0].x === 0 && gameState.dir === "left") {
          gameState.snake.head.x = gameState.areaSize;
        }
        else if (gameState.snake.tail[0].x === gameState.areaSize - 1 && gameState.dir === "right") {
          gameState.snake.head.x = -1;
        }
        else if (gameState.snake.tail[0].y === 0 && gameState.dir === "up") {
          gameState.snake.head.y = gameState.areaSize;
        }
        else if (gameState.snake.tail[0].y === gameState.areaSize - 1 && gameState.dir === "down") {
          gameState.snake.head.y = -1;
        }
      }
    },
    gameZone() {
      var div = document.getElementById('areaGame');
      gameState.score = 0;
      gameState.foods._points = [];
      gameState.dir = "stop";
      gameState.isPause = false;
      gameState.snake.head = {
        x: Math.floor(gameState.areaSize / 2 - 1),
        y: Math.floor(gameState.areaSize / 2),
        tail: [],
        maxTail: Math.pow(gameState.areaSize, 2)
      };
      gameState.snake.tail.unshift({ x: gameState.snake.head.x, y: gameState.snake.head.y });
      for (var j = 0; j < gameState.areaSize; j++) {
        for (var i = 0; i < gameState.areaSize; i++) {
          var newDiv = document.createElement('div');
          newDiv.id = `${i} ${j}`;
          newDiv.classList.add('AreaBox')
          div.appendChild(newDiv);
        }
      }
      gameState.walls = [];
      if (gameState.isInteriorWalls) { myGame.interiorWallsGame(); myGame.drawInteriorWalls(); }
      document.getElementById(`${gameState.snake.head.x} ${gameState.snake.head.y}`).classList.add('head');
      if (gameState.isInteriorWalls) gameState.snake.maxTail - gameState.walls.length;
      else if (!gameState.isInteriorWalls) gameState.snake.maxTail = Math.pow(gameState.snake.maxTail, 2);
    },
    action() {
      if (gameState.dir === "left" && gameState.snake.head.x > 0) gameState.snake.head.x--;
      else if (gameState.dir === "right" && gameState.snake.head.x < gameState.areaSize - 1) gameState.snake.head.x++;
      else if (gameState.dir === "up" && gameState.snake.head.y > 0) gameState.snake.head.y--;
      else if (gameState.dir === "down" && gameState.snake.head.y < gameState.areaSize - 1) gameState.snake.head.y++;
      document.getElementById("result").innerHTML = gameState.score;
    },
    eat() {
      gameState.snake.tail.unshift({ x: gameState.snake.head.x, y: gameState.snake.head.y });
      const food = gameState.foods._points.find((foodPoint) => gameState.snake.checkCollisions(foodPoint));
      if (food != null) {
        let rankUp = 1;
        if (gameState.isInteriorWalls && gameState.isMoveWalls) rankUp = 3;
        else if (!gameState.isInteriorWalls && gameState.isMoveWalls || gameState.isInteriorWalls && !gameState.isMoveWalls) rankUp = 2;
        if (food.z === 1) gameState.score += 5 * rankUp;
        else gameState.score += 1 * rankUp;
        gameState.foods.remove(food);
      } else gameState.snake.tail.pop();
    },
    generateFood() {
      while (true) {
        const foodPoint = {
          x: Math.floor(Math.random() * gameState.areaSize + 0),
          y: Math.floor(Math.random() * gameState.areaSize + 0),
        };

        if (!gameState.snake.checkCollisions(foodPoint)) {
          if (gameState.isTimeFoods) {
            foodPoint.z = Math.floor(Math.random() * 2 + 0), // Тип еды 0 - стандартная, 1 - пропадает через время
              foodPoint.t = Math.floor(Math.random() * 18 + 10) // Время через которое пропадет еда
          } else foodPoint.z = 0;

          gameState.foods.add(foodPoint)
          break
        };
      }
      gameState.snake.foodTurn = 10;
    },
    drawTailCondition() {
      if (gameState.snake.tail[0].x >= 0 && gameState.snake.tail[0].x < gameState.areaSize &&
        gameState.snake.tail[0].y >= 0 && gameState.snake.tail[0].y < gameState.areaSize) {
        for (let i = 1; i < gameState.snake.tail.length; i++) {
          if (gameState.snake.tail[0].x == gameState.snake.tail[i].x &&
            gameState.snake.tail[0].y == gameState.snake.tail[i].y) myGame.statusLose();
        }
        if (gameState.isInteriorWalls) {
          for (let i = 0; i < gameState.walls.length; i++) {
            if (gameState.snake.head.x === gameState.walls[i].x &&
              gameState.snake.head.y === gameState.walls[i].y) myGame.statusLose();
          }
          for (const wall of gameState.walls) {
            for (const point of wall.points) {
              for (const tail of gameState.snake.tail) {
                if (point.x === tail.x && point.y === tail.y) myGame.statusLose();
              }
            }
          }
        }
      }
    },
    checkWinCondition() {
      if (gameState.snake.tail.length === gameState.snake.maxTail) {
        gameState.isGameActive = false;
        if (gameState.bestScore < gameState.score) gameState.bestScore = gameState.score;
        document.getElementById("result").innerHTML = gameState.score;
        document.getElementById("result2").innerHTML = gameState.bestScore;
        gameState.isGameResult = "You Win";
        document.getElementById('gameStatus').innerHTML = gameState.isGameResult;
        pageManager.openPages(['statusPage', 'gamePage']);
      }
    },
    statusLose() {
      gameState.isGameActive = false;
      if (gameState.bestScore < gameState.score) gameState.bestScore = gameState.score;
      document.getElementById("result").innerHTML = gameState.score;
      document.getElementById("result2").innerHTML = gameState.bestScore;
      gameState.isGameResult = "You Lose";
      document.getElementById('gameStatus').innerHTML = gameState.isGameResult;
      pageManager.openPages(['statusPage', 'gamePage']);
    },
    cleanGameState() {
      gameState.dir = "stop";
      gameState.score = 0;
      gameState.snake.tail = [];
    },
    interiorWallsGame() {
      let nWalls = Math.floor(Math.random() * gameState.areaSize / 4 + 3); // количество стен
      let id = -1;
      let dirWallX = 0;
      let dirWallY = 0;
      for (let i = 0; i < nWalls; i++) {
        let xWalls = Math.floor(Math.random() * gameState.areaSize + 0);  // координаты
        let yWalls = Math.floor(Math.random() * gameState.areaSize + 0); // x and y
        if (gameState.isMoveWalls) {
          if (Math.random() > 0.5) {
            dirWallX = Math.floor(Math.random() * 2 - 1); //dx
            dirWallY = 0;
          } else {
            dirWallX = 0;
            dirWallY = Math.floor(Math.random() * 2 - 1); //dy
          }
        }
        let randomizeWalls = Math.floor(Math.random() * 2 + 0);  // направление стен  |-
        let speedWall = Math.floor(Math.random() * 8 + 3) // скорость стен
        let lengthWalls = Math.floor(Math.random() * 2 + 3); //длина стен
        id++;
        if (xWalls + lengthWalls > gameState.areaSize) xWalls = gameState.areaSize - lengthWalls;
        if (yWalls + lengthWalls > gameState.areaSize) yWalls = gameState.areaSize - lengthWalls;
        const wall = { id, points: [], dx: dirWallX, dy: dirWallY, speed: speedWall, maxSpeed: speedWall }; //Создаем массив
        gameState.walls.push(wall);
        for (let i = 0; i < lengthWalls; i++) {
          if ((xWalls != gameState.areaSize / 2 && yWalls != gameState.areaSize / 2) &&
            (xWalls != gameState.areaSize / 2 + 1 && yWalls != gameState.areaSize / 2) &&
            (xWalls != gameState.areaSize / 2 - 1 && yWalls != gameState.areaSize / 2) &&
            (xWalls != gameState.areaSize / 2 + 1 && yWalls != gameState.areaSize / 2) &&
            (xWalls != gameState.areaSize / 2 - 1 && yWalls != gameState.areaSize / 2 + 1) &&
            (xWalls != gameState.areaSize / 2 - 1 && yWalls != gameState.areaSize / 2) &&
            (xWalls != gameState.areaSize / 2 - 1 && yWalls != gameState.areaSize / 2 - 1)) {
            if (randomizeWalls === 1) wall.points.push({ x: xWalls + i, y: yWalls });
            else wall.points.push({ x: yWalls, y: xWalls + i });
          }
        }
      }
    },
    wallMovement() {
      if (gameState.dir != "stop" && gameState.isMoveWalls) {
        for (const wall of gameState.walls) {
          if (wall.points.some((point) => point.x === 0)) wall.dx = wall.dx === 0 ? 0 : 1;
          if (wall.points.some((point) => point.y === 0)) wall.dy = wall.dy === 0 ? 0 : 1;
          if (wall.points.some((point) => point.x === gameState.areaSize - 1)) wall.dx = wall.dx === 0 ? 0 : -1;
          if (wall.points.some((point) => point.y === gameState.areaSize - 1)) wall.dy = wall.dy === 0 ? 0 : -1;
          if (wall.speed <= 0) {
            for (const point of wall.points) {
              point.x += wall.dx;
              point.y += wall.dy;
            }
            wall.speed = wall.maxSpeed;
          }
          wall.speed--;
        }
      }
    },
    drawInteriorWalls() {
      for (const wall of gameState.walls) {
        for (const point of wall.points) {
          document.getElementById(`${point.x} ${point.y}`).classList.add('interWalls');
        }
      }
    },
    clearInteriorWalls() {
      for (let j = 0; j < gameState.areaSize; j++) {
        for (let i = 0; i < gameState.areaSize; i++) {
          document.getElementById(`${i} ${j}`).classList.remove('interWalls');
        }
      }
    }
  }
  const myMenus = {
    cleanGameZone() {
      const myNode = document.getElementById("areaGame");
      myNode.innerHTML = '';
    }
  }
}