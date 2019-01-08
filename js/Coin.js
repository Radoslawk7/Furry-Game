const $ = require('jquery');

export class Coin {

    constructor(x, y) {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);

    };
}