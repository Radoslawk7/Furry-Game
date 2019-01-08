const $ = require('jquery');
console.log('Hello World');


import { Furry } from './Furry';
import { Coin } from './Coin';



class Game {
    constructor(furry, coin, board, score, index) {
        this.sGame = document.querySelector('#sGame');
        this.sCoin = document.querySelector('#sCoin');
        this.sDie = document.querySelector('#sDie');
        this.furry = new Furry();
        this.coin = new Coin();
        this.board = $('#board').children();
        this.score = 0;
        this.index = ((x, y) => x + (y * 10));
    }

    showFurry() {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    showCoin() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    startGame() {
        let self = this;
        this.idSetinterval = setInterval(() => {
             self.moveFurry();
         }, 250);

        this.sGame.play();
    }

    moveFurry() {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        } else if(this.furry.direction === "up"){
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    hideVisibleFurry() {
        if (this.board.hasClass('furry')) {
            this.board.removeClass('furry')
        }
    }

    turnFurry(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "up";
                break;
            case 38:
                this.furry.direction = "down";
                break;
        }

    }

    checkCoinCollision() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            $('.coin').removeClass('coin');
            this.coin = new Coin();
            this.showCoin();

            let points = $('#score').find('div').children();
            this.score++;
            points.text(this.score);
            this.sCoin.play();

        }
    }

    gameOver() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetinterval);
            this.hideVisibleFurry();

            $('#over').removeClass('invisible');
            let overPre= $('<pre></pre>');
            overPre.text('GAME OVER \n \n Your score is: ' + this.score);
            $('#over').append(overPre);
            this.sGame.pause();
            this.sDie.play();

        }
    }

}

    let game = new Game();

game.showFurry();
game.showCoin();
game.startGame();
//
// document.on(('keydown', function(event){
//    game.turnFurry(event);
// });

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});
