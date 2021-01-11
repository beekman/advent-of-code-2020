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
const { dirxml } = require('console');
const fs = require('fs');
let lines = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x);

class Seating {
  constructor(lines) {
    this.height = lines.length;
    this.width = lines[0].length;

    this.seats = lines;
  }

  nextState() {
    let hasChanged = false;

    const updatedSeats = [];

    this.seats.forEach((line, y) => {
      let updated = '';

      [...line].forEach((seat, x) => {
        let totalNeighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if ((i != 0 || j != 0)
              && y + i >= 0
              && y + i < this.height
              && x + j >= 0
              && x + j < this.width
              && this.seats[y + i][x + j] === '#') {
              totalNeighbors++;
            }
          }
        }
        if (seat == 'L' && totalNeighbors === 0) {
          // If a seat is empty (L) and there are no occupied seats adjacent to it,
          //    the seat becomes occupied.
          updated += '#';
          hasChanged = true;
        } else if (seat === '#' && totalNeighbors >= 4) {
          // If a seat is occupied (#) and four or more seats adjacent to it are also occupied,
          //    the seat becomes empty.
          updated += 'L';
          hasChanged = true;
        } else {
          // Otherwise, the seat's state does not change.
          updated += seat;
        }

      });

      updatedSeats.push(updated);
    });

    this.seats = updatedSeats;

    return hasChanged;
  }

  nextState2() {
    let hasChanged = false;

    const updatedSeats = [];

    this.seats.forEach((line, y) => {
      let updated = '';

      [...line].forEach((seat, x) => {
        let occupied = 0;
        const directions = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 1, y: 1 }, { x: -1, y: -1 },
          { x: 1, y: -1 }, { x: -1, y: 1 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ];
        directions.forEach(({ x: dx, y: dy }) => {
          let posX = x + dx;
          let posY = y + dy;
          while (posX >= 0 && posY >= 0 && posX < this.width && posY < this.height) {
            if (this.seats[posY][posX] === '#') {
              occupied++;
              break;
            }
            if (this.seats[posY][posX] === 'L') {
              break;
            }
            posX += dx;
            posY += dy;
          }
        });
        if (seat == 'L' && occupied === 0) {
          updated += '#';
          hasChanged = true;
        } else if (seat === '#' && occupied >= 5) {
          updated += 'L';
          hasChanged = true;
        } else {
          updated += seat;
        }

      });

      updatedSeats.push(updated);
    });

    this.seats = updatedSeats;

    return hasChanged;
  }

  getOccupiedSeats() {
    let occupied = 0;
    this.seats.forEach((line) => {
      [...line].forEach((seat) => {
        if (seat === '#') {
          occupied++;
        }
      });
    });
    return occupied;
  }

  display() {
    this.seats.forEach(line => {
      console.log(line);
    });
  }
}

const grid = new Seating(lines);

grid.display();

while (grid.nextState()) {
  //do nothing
}

grid.display();

console.log(grid.getOccupiedSeats());

const grid2 = new Seating(lines);

while (grid2.nextState2()) {
  //do nothing
  grid2.display();
  console.log('----------');
}

console.log(grid2.getOccupiedSeats());
