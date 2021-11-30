document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        main();
    }
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
    });
    const escButtonElement = document.getElementById('esc-btn');
    escButtonElement.addEventListener('click', () => {
        pages.mainMenu.classList.add('hidden');
        pages.gameMenu.classList.remove('hidden');
        pages.gamePage.classList.remove('hidden');
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