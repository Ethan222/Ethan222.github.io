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
        return `<img title='${card.toString()}' class='card' src='${this.getImageSrc(card)}'>`;
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
class Character {
    name;
    credits = 20_000;
    hand = [];
    constructor(name) {
        this.name = name;
    }
    get html() {
        let ret = `<h3>${this.name}</h3> <p>Credits: ${this.credits}</p>`;
        for(let card of this.hand)
            ret += Card.getHTML(card);
        return ret;
    }
}
const deck = new Deck();
document.getElementById("discardPile").innerHTML = Card.getHTML(deck.draw());
const player = new Character("Ethan");
player.hand.push(deck.draw(), deck.draw());
document.getElementById("playArea").innerHTML += player.html;