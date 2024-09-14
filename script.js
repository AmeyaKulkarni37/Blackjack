var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
    document.getElementById("reset").addEventListener("click", resetGame);
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["S", "H", "D", "C"];
    deck = []

    for (let i=0; i<values.length; i++) {
        for (let j=0; j<suits.length; j++) {
            deck.push(values[i] + "-" + suits[j]);
        }
    }
}

function shuffleDeck() {
    for (let i=0; i<deck.length; i++) {
        let temp = deck[i];
        let idx = Math.floor(Math.random() * deck.length);
        deck[i] = deck[idx];
        deck[idx] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    
    // dealer hand
    for (let i=0; i<1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
      

    // player hand
    for (let i=0; i<2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    document.getElementById("player-sum").innerText = playerSum;

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {return;}

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
    
    reducePlayerAce()
    if (playerSum > 21) {
        canHit=false;
        stay();
    }

    document.getElementById("player-sum").innerText = playerSum;

}

function stay() {
    if (canHit) {
        while (dealerSum < 17) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
            document.getElementById("dealer-cards").append(cardImg);
            reduceDealerAce();
        } 
    }
    canHit=false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;

    let message = "";
    
    if (playerSum>21) {
        message = "Bust! You Lose!";
    }
    else if (dealerSum>21) {
        message = "You Win!";
    }
    else if (playerSum==dealerSum) {
        message = "Tie!";
    }
    else if (playerSum>dealerSum) {
        message = "You Win!";
    }
    else {
        message = "You Lose!";
    }

    document.getElementById("results").innerText = message;
}

function reducePlayerAce() {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum-=10;
        playerAceCount-=1;
    }
}

function reduceDealerAce() {
    while (dealerSum > 21 && dealerAceCount > 0) {
        dealerSum-=10;
        dealerAceCount-=1;
    }
}


function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        else {
            return 10;
        }
    }

    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function resetGame() {
    document.getElementById("dealer-cards").innerHTML='<img id="hidden" src="./cards/BACK.png">';
    document.getElementById("player-cards").innerHTML="";
    document.getElementById("results").innerText="";
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("player-sum").innerText = "";

    dealerSum = 0;
    playerSum = 0;
    deck = [];

    dealerAceCount = 0;
    playerAceCount = 0;
    canHit = true;

    buildDeck();
    shuffleDeck();
    startGame();
}
