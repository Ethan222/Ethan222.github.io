class Card {
    val;
    suit;
    constructor(val, suit) {
        this.val = val;
        this.suit = suit;
    }
    toString() {
        return `${this.val > 0 ? "+" : ""}${this.val} ${this.suit}`;
    }
    static getImageSrc(card) {
        return `assets/cards/${card.toString()}.png`;
    }
    static getHTML(card) {
        return `<img id='${card.toString()}' title='${card.toString()}' class='card' src='${this.getImageSrc(card)}'>`;
    }
}
class Deck {
    cards;
    suits = ["Circle", "Square", "Triangle"];
    constructor() {
        this.reset();
    }
    reset() {
        this.cards = [];
        for(const suit of this.suits) {
            for(let val = 1; val <= 10; val++) {
                this.cards.push(new Card(val, suit), new Card(-val, suit));
            }
        }
        let sylop = new Card(0, "sylop");
        this.cards.push(sylop, sylop);
    }
    draw() {
        return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1);
    }
}
class DiscardPile {
    EMPTY_PILE_HTML = "<img class='card' src='assets/cards/empty-discard-pile.png'>";
    constructor(deck) {
        this.cards = [deck.draw()];
        this.updateHTML();
    }
    updateHTML() {
        document.getElementById("discardPile").innerHTML = this.cards.length > 0 ? Card.getHTML(this.cards[this.cards.length - 1]) : this.EMPTY_PILE_HTML;
    }
    getTopCard() {
        return this.cards.pop();
    }
}
class Character {
    credits = 20_000;
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.hand = [deck.draw(), deck.draw()];
        this.updateHTML();
    }
    get html() {
        let ret = `<h4>${this.name}</h4> <p>Credits: ${this.credits}</p>`;
        for(let card of this.hand)
            ret += Card.getHTML(card);
        return ret;
    }
    updateHTML() {
        document.getElementById(this.id).innerHTML = this.html;
    }
    discard(cardToDiscard) {
        const id = cardToDiscard.id;
        let index = -1;
        for(let i = 0; i < this.hand.length; i++) {
            if(this.hand[i].toString() == id) {
                index = i;
                break;
            }
        }
        if(index != -1)
            return this.hand.splice(index, 1);
    }
}
class Player extends Character {
    constructor(name) {
        super(name, "player");
    }
    updateHTML() {
        super.updateHTML();
        for(const card of this.hand) {
            document.getElementById(card.toString()).setAttribute("onclick", "discard(this)");
        }
    }
}
const State = {
    DRAWING: "DRAWING",
    DISCARDING: "DISCARDING",
    GAME_OVER: "GAME_OVER"
}

const deck = new Deck();
const discardPile = new DiscardPile(deck);
const player = new Player("Ethan", deck);
let round = 1;
let state;
switchToDrawState();

function drawFromDeck() {
    if(state === State.DRAWING) {
        player.hand.push(deck.draw());
        player.updateHTML();
        switchToDiscardState();
    }
}
function drawFromDiscard() {
    if(state === State.DRAWING) {
        player.hand.push(discardPile.getTopCard());
        discardPile.updateHTML();
        player.updateHTML();
        switchToDiscardState();
    }
}
function discard(card) {
    if(state === State.DISCARDING) {
        discardPile.cards.push(player.discard(card));
        player.updateHTML();
        discardPile.updateHTML();

        goToNextRound();
    }
}
function switchToDrawState() {
    state = State.DRAWING;
    document.getElementById('instructions').innerText = 'Draw from the deck or discard pile';
}
function switchToDiscardState() {
    state = State.DISCARDING;
    document.getElementById('instructions').innerText = 'Discard a card';
}
function goToNextRound() {
    round++;
    if(round <= 3) {
        document.getElementById("round number").innerText = `Round ${round}/3`;
        switchToDrawState()
    } else {
        document.getElementById('instructions').innerText = 'Game over';
        state = State.GAME_OVER;
    }
}