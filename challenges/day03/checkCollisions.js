var fs = require('fs');

const checkCollisions = () => {
  fs.readFile('./input.txt', 'utf8', function(err, data) {
    if(err) throw err;
    const rows = data.split('\n');
    rows.forEach(row => {
    });
    console.log(countValidPasswords);
  });
};

console.log(checkCollisions);
