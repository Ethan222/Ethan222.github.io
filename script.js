class Card {
    constructor(val, suit) {
        this.val = val;
        this.suit = suit;
    }
    toString() {
        return `${this.val} ${this.suit}`;
    }
}

let testCard = new Card(1, "Triangle");
document.getElementById("test").innerText = testCard;