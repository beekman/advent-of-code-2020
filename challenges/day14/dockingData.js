const fs = require('fs');

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x);

class Program {
  constructor(input) {
    this.instructions = input;
    this.memory = new Map();
  }

  run() {
    this.instructions.forEach((line) => {
      if (/^mask/.test(line)) {
        const { groups } = /^mask = (?<mask>.*)$/.exec(line);
        this.mask = [...groups.mask];
      } else {
        const { groups } = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/.exec(line);
        console.log(groups);
        let address = Number(groups.address);
        let decimal = Number(groups.value);
     
        let string = [...decimal.toString(2).padStart(36, '0')].map((value, index) => {
          if (this.mask[index] === 'X') return value;
          return this.mask[index];
        }).join('');
        let value = parseInt(string, 2);
        this.memory.set(address, value);
      }
    });
  }
  getSum() {
    let result = 0;
    this.memory.forEach((v) => {
      result += v;
    });
    // console.log(this.memory);
    return result;
  }
}

const p = new Program(lines);

p.run();

console.log(`Part One: ${p.getSum()}`);
