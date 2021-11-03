/**
 * Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazine di git).
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri delle bombe?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
In allegato la grafica che abbiamo usato insieme questa mattina
 */

const playBtn = document.querySelector('.btn-play');
const difficultyLevel = document.getElementById('difficulty');
const gridContainer = document.querySelector('.grid-container');

// Set grid

playBtn.addEventListener('click', () => {
    
    // Reset content
    gridContainer.innerHTML = '';

    // Set grid dimensions
    const gridDimension = difficultyLevel.value;
    console.log(gridDimension);
    let cellsNumber;
    let cellsPerSide;

    switch (gridDimension) {
        case '1':
            cellsNumber = 100;
            cellsPerSide = 10;
            break;
        
        case '2':
            cellsNumber = 81;
            cellsPerSide = 9;
            break;

        case '3':
            cellsNumber = 49;
            cellsPerSide = 7;
    }
    console.log(cellsNumber);
    console.log(cellsPerSide);

    // Generating bombs
    const bombList = generateBombs(cellsNumber, 16);
    console.log('Bombe create', bombList);

    // Attempts list
    const attempts = [];
    const maxAttempts = cellsNumber - bombList.length;
    console.log('Tentativi possibili', maxAttempts);


    // Generating grid parent

    const grid = document.createElement('div');
    grid.classList.add('grid');

    // Injecting grid
    
    gridContainer.append(grid);

    // Generating grid square

    const numList = [];

    for (let i = 1; i <= cellsNumber; i++) {

        // Generate square
        const square = createGridSquare(i, cellsPerSide);

        square.addEventListener('click', function() {
            this.classList.add('clicked');
        });

        // Add generated square to grid
        grid.append(square);

    }
    console.log(numList);

    // Add grid
    gridContainer.append(grid);
});

/**
 * Handling square clicks
 */

function handleSquareClick(square, bombList, attempts, maxAttempts) {

    // Get square number

    const number = parseInt(square.innerHTML);
    console.log(number);

    // Hit bomb?

    if(bombList.includes(number)) {
        console.log('Hai colpito una bomba!');
    } else if(!attempts.includes(number)) {
        square.classList.add('safe');

        attempts.push(number);
        console.log('Tentativi riusciti', attempts);

        if(attempts.length === maxAttempts) {
            console.log('Hai vinto!');
            endGame(bombList, attempts, maxAttempts);
        }
    }
}

/**
 * End game
 */

function endGame(bombList, attempts, maxAttempts) {
    const squares = document.querySelectorAll('.square');
    console.log(squares);

    for(let i = 0; i < squares.length; i++) {
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);

        if(bombList.includes(squareValue)) {
            square.classList.add('bomb');
        }
    }

    let message = `Congratulazioni, hai vinto! Sei riuscito a fare ${maxAttempts} tentativi di seguito! Gioca ancora cliccando di nuovo sul tasto "Play" dopo aver scelto la difficoltà!`

    if(attempts.length < maxAttempts) {
        message = `Hai perso :( Sei riuscito a fare ${attempts.length} tentativi di fila. Gioca ancora cliccando di nuovo sul tasto "Play" dopo aver scelto la difficoltà!`
    }

    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.append(message);
    document.querySelector('.grid-container').append(messageEl);

    document.querySelector('.grid').classList.add('end-game');
}

/**
 * Generating bomb list
 */

function generateBombs(totCells, totBombs) {
    // 16 unique random numbers
    const bombs = [];

    while(bombs.length < totBombs) {
        const bomb = getRandomNumber(1, totCells);

        if(!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }

    return bombs;
    console.log(bombs);
}


/**
 *  Generating random number
 */

function getRandomNumber(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min);
}

/**
 *  Generating squares
 */

function createGridSquare(num, cells) {

    // Create square node

    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${cells} - 2px)`;
    node.style.height = `calc(100% / ${cells} - 2px)`;

    // Add span inside square

    node.append(num);

    return node;
}