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
    get imageSrc() {
        return this.toString() + ".png";
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
const deck = new Deck();
let card = deck.draw();
document.getElementById("playArea").innerHTML = `<img src=${card.imageSrc} title=${card.toString()}>`;