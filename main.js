let isGameActive = false;
const gameTimeToFrame = 300;

let blok = 20;
let score = 0;
let dir = "stop";
let string = 20;
let head = {
    x: Math.floor(string/2-1),
    y: Math.floor(blok/2),
    Tail: [],
    MaxTail: blok * string  
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
    if (e.code === 'KeyA' && dir != "right"){ dir = "left";}
    else if (e.code === 'KeyW' && dir != "down"){ dir = "up";}
    else if (e.code === 'KeyD' && dir != "left"){ dir = "right";}
    else if (e.code === 'KeyS' && dir != "up"){ dir = "down";}

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
        gameZone();
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
function gameZone(){
    var div = document.getElementById('areaGame');
    head.Tail.unshift({x: head.x, y: head.y});
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
}
function action(){
    document.getElementById(`${food.x} ${food.y}`).classList.remove('food');
    if (dir === "left") { head.x--;}
    else if (dir === "right") {head.x++;}
    else if (dir === "up") {head.y--;}
    else if (dir === "down") {head.y++;}
    document.getElementById(`${food.x} ${food.y}`).classList.add('food');
    document.getElementById("result").innerHTML = score;
}
function eat(){
    if (head.x == food.x && head.y == food.y){
        document.getElementById(`${food.x} ${food.y}`).classList.remove('food');
        head.Tail.unshift({x: head.x, y: head.y});
        score++;
        food = {
            x: Math.floor(Math.random()*string+0),
            y: Math.floor(Math.random()*blok+0)
        };
        
    }
    else {
        head.Tail.pop();
        head.Tail.unshift({x: head.x, y: head.y});
    }
}
function tail(){
    if (head.Tail[0].x >= 0 && head.Tail[0].x < string && head.Tail[0].y >= 0 && head.Tail[0].y < blok){
    for (let j = 0; j < blok; j++){
        for (let i = 0; i < string; i++){
            document.getElementById(`${i} ${j}`).classList.remove('tail');
            document.getElementById(`${i} ${j}`).classList.remove('head');
        }
    }
    for (let i = 0; i < head.Tail.length; i++){
            if (i == 0){
                document.getElementById(`${head.Tail[i].x} ${head.Tail[i].y}`).classList.add('head'); 
            }
            else {
                document.getElementById(`${head.Tail[i].x} ${head.Tail[i].y}`).classList.add('tail'); 
            } 
    }
}
}
function walls(){
    if ((head.x === 0 && dir === "left") || ( head.x === string-1 && dir === "right" ) || 
    ( head.y === blok-1 && dir === "down" ) || ( head.y === 0 && dir === "up" )){ 
        isGameActive = false;
        score ="Dead"; 
        document.getElementById("result").innerHTML = score;
    }
}

function game() {
    action();
    eat();
    tail();
    setTimeout(walls, gameTimeToFrame);
    if (isGameActive) setTimeout(game, gameTimeToFrame);
}

    
