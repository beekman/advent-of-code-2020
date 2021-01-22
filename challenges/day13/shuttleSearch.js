const fs = require('fs');

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x);

const timestamp = Number(lines[0]);
const buses = lines[1].split(',');

const busList = [];

buses.forEach(bus => {
  if (bus === 'x') return;
  const id = Number(bus);
  busList.push({
    bus: id,
    nextBusInMinutes: id - timestamp % id,
  });
});

busList.sort((a, b) => a.nextBusInMinutes - b.nextBusInMinutes);
// console.log(busList);
console.log('Part One: ' + busList[0].bus * busList[0].nextBusInMinutes);

const timestamps = [];

buses.forEach((bus, index) => {
  if (bus !== 'x') timestamps.push({ id: parseInt(bus), delta: index });
});

let step = timestamps[0].id;
let t = step;

for (let i = 1; i < timestamps.length; i++) {
  while ((t + timestamps[i].delta) % timestamps[i].id !== 0) {
    t += step;
  }
  step *= timestamps[i].id;
}

console.log('Part Two: ' + t);
