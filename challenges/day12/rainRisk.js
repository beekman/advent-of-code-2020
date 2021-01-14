const fs = require('fs');
const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x);

const angleToCompassDirection = {
  0: 'N',
  1: 'E',
  2: 'S',
  3: 'W',
};

class Boat {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 1;
  };

  move(char, amount) {
    switch (char) {
      case 'N':
        this.y += amount;
        break;
      case 'E':
        this.x += amount;
        break;
      case 'S':
        this.y -= amount;
        break;
      case 'W':
        this.x -= amount;
        break;
      case 'L':
        this.direction = ((this.direction - (amount / 90)) + 4) % 4;
        break;
      case 'R':
        this.direction = ((this.direction + (amount / 90)) + 4) % 4;
        break;
      case 'F':
        this.move(angleToCompassDirection[this.direction], amount);
        break;
      default:
        throw new Error(char + 'is not a valid value');
    }
  }
  getPosition() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

const boat = new Boat();

lines.forEach(line => {
  const char = line[0];
  const number = line.slice(1);
  boat.move(char, parseInt(number));
});

console.log(boat.getPosition());
