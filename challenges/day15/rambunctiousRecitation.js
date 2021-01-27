const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x);

class Game {
  constructor(input) {
    this.memory = new Map(); // number => last turn
    this.turn = 1;

    input.forEach(number => {
      this.memory.set(number, [this.turn]);
      this.lastNumber = number;
      this.turn++;
    });
  }

  playUntilTurn(turn) {
    while (this.turn <= turn) {
      let newNumber;

      if (this.memory.has(this.lastNumber)) {
        newNumber = this.turn - 1 - this.memory.get(this.lastNumber);
      } else {
        newNumber = 0;
      }
      // console.log(newNumber);

      this.memory.set(this.lastNumber, this.turn - 1);
      this.lastNumber = newNumber;
      this.turn++;
    }
  }
}
const cleanInput = input[0].split(',').map(x => Number(x));

const game = new Game(cleanInput);

game.playUntilTurn(2020);

console.log(`Part One: ${game.lastNumber}`);

const game2 = new Game(cleanInput);

game2.playUntilTurn(30000000);

console.log(`Part Two: ${game2.lastNumber}`);
