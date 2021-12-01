let isGameActive = false;
const gameTimeToFrame = 1000;

let blok = 10;
let dir = "stop";
let string = 10;
let head = {
    x: Math.floor(string/2-1),
    y: Math.floor(blok/2)
};
let food = {
    x: Math.floor(Math.random()*string+0),
    y: Math.floor(Math.random()*blok+0)
};



document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        main();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.keycode === 37 && dir != "right"){ dir = "left";}
    else if (e.keycode === 38 && dir != "down"){ dir = "up";}
    else if (e.keycode === 39 && dir != "left"){ dir = "right";}
    else if (e.keycode === 40 && dir != "up"){ dir = "down";}

});

function main() {
    // document.querySelector()
    const pages = {
        mainMenu: document.getElementById('mainMenu'),
        gameMenu: document.getElementById('gameMenu'),
        gamePage: document.getElementById('game-page')
    };


    const playButtonElement = document.getElementById('play-btn');
    playButtonElement.addEventListener('click', () => {
        pages.mainMenu.classList.add('hidden');
        pages.gameMenu.classList.add('hidden');
        pages.gamePage.classList.remove('hidden');
        isGameActive = true;
        GameZone();
        setTimeout(game, gameTimeToFrame);
    });
    const escButtonElement = document.getElementById('esc-btn');
    escButtonElement.addEventListener('click', () => {
        pages.mainMenu.classList.add('hidden');
        pages.gameMenu.classList.remove('hidden');
        pages.gamePage.classList.remove('hidden');
        head.x++;
    });
    const rmButtonElement = document.getElementById('return-btn');
    rmButtonElement.addEventListener('click', () => {
        pages.mainMenu.classList.remove('hidden');
        pages.gameMenu.classList.add('hidden');
        pages.gamePage.classList.add('hidden');
    });
    const ngButtonElement = document.getElementById('nw-btn');
    ngButtonElement.addEventListener('click', () => {
        pages.mainMenu.classList.add('hidden');
        pages.gameMenu.classList.add('hidden');
        pages.gamePage.classList.remove('hidden');
    });
    const conButtonElement = document.getElementById('con-btn');
    conButtonElement.addEventListener('click', () => {
        pages.mainMenu.classList.add('hidden');
        pages.gameMenu.classList.add('hidden');
        pages.gamePage.classList.remove('hidden');
    });

}
function GameZone(){
    var div = document.getElementById('areaGame');
    for (var j = 0; j < blok; j++){
        for (var i = 0; i < string; i++ )
        {
            var newDiv = document.createElement('div');
            newDiv.id = `${i} ${j}`;
            newDiv.classList.add('AreaBox')
            div.appendChild(newDiv);
        }
    }
    document.getElementById(`${food.x} ${food.y}`).classList.add('food');
    document.getElementById(`${head.x} ${head.y}`).classList.add('head');
}
function game() {
    document.getElementById(`${food.x} ${food.y}`).classList.remove('food');
    document.getElementById(`${head.x} ${head.y}`).classList.remove('head');
    if (dir === "left") {head.x--;}
    else if (dir === "right") {head.x++;}
    else if (dir === "up") {head.y--;}
    else if (dir === "down") {head.y++;}
    document.getElementById(`${food.x} ${food.y}`).classList.add('food');
    document.getElementById(`${head.x} ${head.y}`).classList.add('head');
    // document.getElementById("result").innerHTML = head.x;
    if (isGameActive) setTimeout(game, gameTimeToFrame);
}

    
