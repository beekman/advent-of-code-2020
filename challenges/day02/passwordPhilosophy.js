var fs = require('fs');

const passwordPhilosophy = () => {
  let countValidPasswords = 0;
  fs.readFile('./input.txt', 'utf8', function(err, data) {
    if(err) throw err;
    const rows = data.split('\n');
    rows.forEach(row => {
      let passwordRegexp = /(?<min>\d*)-(?<max>\d*) (?<letter>\w*): (?<password>\w*)/m;
      let match = passwordRegexp.exec(row);
      if(match !== null) {
        //console.log(`Min ${match[1]} ${match[3]}, Max ${match[2]}`);
        let password = `${match[4]}`.split('');
        let min = match[1];
        let max = match[2];
        let matchLetter = `${match[3]}`;
        let countLetter = 0;
        password.forEach(letter => {
          if(letter === matchLetter) {
            countLetter++;
          }
        });
        if((Number(countLetter) >= min) && (Number(countLetter) <= max))
          countValidPasswords++;
      }

    });
    console.log(countValidPasswords);
  });
};

passwordPhilosophy();
