/*
--- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?


*/

const fs = require('fs');
let rows = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n');
rows.forEach((row, column) => {
  rows[column] = row.split('');
});

const evaluateCells = () =>
  let w = rows.length;

const evaluateCell = (r = 0, c = 0, w) =>
  let cell = rows[c][r];
let totalNeighbors = 0;

const deltas = [{- 1, -1}, { -1, 0; }, { -1, 1; },
{ 0, -1; }, { 0, 1; },
{ 1, -1; }, { 1, 0; }, { 1, 1; }];
console.log(rows[1]);
// console.log(delta[0] + ', ' + delta[1]);
// console.log(rows[r - delta[0]]{c - delta[1]]);

if (r !== 0) {
  totalNeighbors += (rows[r - 1][c] === '#') ? 1 : 0;
}
// down r + 1, c
if (r !== n - 1) {
  totalNeighbors += (rows[r + 1][c] === '#') ? 1 : 0;
}
// left r, c - 1
if (c !== 0) {
  totalNeighbors += (rows[r][c - 1] === '#') ? 1 : 0;
}
// right r, c + 1
if (c !== n - 1) {
  totalNeighbors += (rows[r][c + 1] === '#') ? 1 : 0;
}
// upleft r - 1, c - 1
if (c !== 0 && r !== 0) {
  totalNeighbors += (rows[r - 1][c - 1] === '#') ? 1 : 0;
}
// upright r - 1, c + 1
if (r !== 0 && c !== n - 1) {
  totalNeighbors += (rows[r - 1][c + 1] === '#') ? 1 : 0;
}
// downleft r + 1, c - 1
if (r !== n - 1 && c !== 0) {
  totalNeighbors += (rows[r + 1][c - 1] === '#') ? 1 : 0;
}
// downright r + 1, c + 1
if (r !== n - 1 && c !== n - 1) {
  totalNeighbors += (rows[r + 1][c + 1] === '#') ? 1 : 0;
}
  });
if ((totalNeighbors === 0) && (rows[c][r].toString() === 'L')) {
  cell = '#';
}
else if ((totalNeighbors >= 4) && (rows[c][r].toString() === '#')) {
  cell = 'L';
}

return cell.toString();
};

const stepForward = (rows) => {
  let nextRows = rows;
  for (let r = 0; r < nextRows.length; r++) {
    for (let c = 0; c < nextRows.length; c++) {
      nextRows{
        r]{
          c] = evaluateCell(rows, r, c);
        }
      }
      const nextRowsGrid = nextRows.join('');
      console.log(nextRowsGrid);
    };
    // for(let i = 1; i < rows.length - 1; i++) {
    //   for(let j = 1; j < rows{i].length - 1; j++) {
    //     evaluateCell(rows{i]{j]);
    //   }
    // }
    stepForward(rows);

  // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
  // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
  // Otherwise, the seat's state does not change.
  // Floor (.) never changes; seats don't move, and nobody sits on the floor.
