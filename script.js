const animals = [
    'cat', 'dog', 'elephant', 'lion',
    'cat', 'dog', 'elephant', 'lion'
];

const gameContainer = document.getElementById('game-container');
let flippedCards = [];
let matchedCards = 0;

// Funktion för att blanda korten
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Skapa spelet
function createBoard() {
    const shuffledAnimals = shuffle(animals);
    shuffledAnimals.forEach((animal) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;

        const img = document.createElement('img');
        img.src = `images/${animal}.png`; // Se till att bilderna finns i en mapp som heter 'images'
        img.alt = animal;

        card.appendChild(img);
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// Vänd på kortet
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

// Kolla om korten matchar
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    flippedCards = [];

    if (matchedCards === animals.length) {
        setTimeout(() => alert('Grattis! Du har vunnit!'), 500);
    }
}

// Starta spelet
document.getElementById('restart').addEventListener('click', () => {
    gameContainer.innerHTML = '';
    matchedCards = 0;
    createBoard();
});

createBoard();
