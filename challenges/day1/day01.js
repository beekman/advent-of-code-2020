

/*
To save your vacation, you need to get all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
*/
var fs = require('fs');
fs.readFile('./input.txt', 'utf8', function(err, data) {
  if(err) throw err;
  const findPairThatAddsUpTo2020 = (data) => {
    const numbers = data.split('\n');
    let product = null;
    for(let i = 0; i < numbers.length; i++) {
      const firstNumber = Number(numbers[i]);
      numbers.forEach(number => {
        const secondNumber = Number(number);
        if(((2020 - secondNumber) === firstNumber) && (product == null)) {
          console.log(firstNumber * secondNumber);
          product = (firstNumber * secondNumber);
        };
      });
    }
    return product;
  };


  findPairThatAddsUpTo2020(data);
});
