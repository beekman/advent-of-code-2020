const fs = require('fs');

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x).map(x => [...x]);

// console.log(lines);
let gameState = new Map();

lines.forEach((line, y) => {
  line.forEach((value, x) => {
    const active = (value === '#');
    const id = [x, y, 0, 0].join`,`;
    gameState.set(id, active);
  });
});

function getNeighbours(x, y, z, w, gameState) {
  const result = [];
  for(let xIndex = x - 1; xIndex <= x + 1; xIndex++) {
    for(let yIndex = y - 1; yIndex <= y + 1; yIndex++) {
      for(let zIndex = z - 1; zIndex <= z + 1; zIndex++) {
        for(let wIndex = w - 1; wIndex <= w + 1; wIndex++) {
          if(xIndex != x || yIndex != y || zIndex != z || wIndex != w) {
            const key = [xIndex, yIndex, zIndex, wIndex].join`,`;
            if(gameState.has(key)) {
              result.push(gameState.get(key));
            } else {
              result.push(false);
            }
          }
        }
      }
    }
  }
  return result;
}
for(let i = 0; i < 6; i++) { // turn

  //find min-max for x,y,z
  const keys = gameState.keys();
  let minX = null;
  let minY = null;
  let minZ = null;
  let minW = null;
  let maxX = null;
  let maxY = null;
  let maxZ = null;
  let maxW = null;

  for(const key of keys) {
    const [x, y, z, w] = key.split(',').map(x => parseInt(x));
    if(x < minX) minX = x;
    if(y < minY) minY = y;
    if(z < minZ) minZ = z;
    if(x > maxX) maxX = x;
    if(y > maxY) maxY = y;
    if(z > maxZ) maxZ = z;
    if(w < minW) minW = w;
    if(w > maxW) maxW = z;
  }

  const newState = new Map();

  for(let x = minX - 1; x <= maxX + 1; x++) {
    for(let y = minY - 1; y <= maxY + 1; y++) {
      for(let z = minZ - 1; z <= maxZ + 1; z++) {
        for(let w = minW - 1; w <= maxW + 1; w++) {
          const neighbours = getNeighbours(x, y, z, w, gameState);
          const activeNeighbors = neighbours.filter(x => x).length;
          const key = [x, y, z, w].join`,`;
          const isActive = gameState.has(key) ? gameState.get(key) : false;
          if(isActive && activeNeighbors !== 2 && activeNeighbors !== 3) {
            newState.set(key, false);
          } else if(!isActive && activeNeighbors === 3) {
            newState.set(key, true);
          } else {
            newState.set(key, isActive);
          }
        }
      }
    }
  }
  gameState = newState;
}

// count active cubes
let sum = 0;
let cubes = gameState.values();
for(const cube of cubes) {
  if(cube) sum++;
}

console.log(sum);
